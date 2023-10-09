import { Request, Response, NextFunction } from "express";
import { success, error } from "../utils";
import { NotificationSetting } from "../database/entity/model";
import { connectionSource } from "../database/data-source";
import { User } from "../database/entity/user";
import {
  accountSettingSchema,
  hashPassword,
} from "../services/settings.service";
const userRespository = connectionSource.getRepository(User);

export const createAccountSettingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, currentPassword, newPassword, confirmNewPassword } =
      req.body;

    const { error } = accountSettingSchema.validate({
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    if (error) {
      return res.status(400).json({
        status: `error`,
        method: req.method,
        message: error.message,
      });
    }

    const user = await userRespository.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        status: `error`,
        message: `User not found`,
        success: false,
      });
    }

    if (currentPassword !== user.password) {
      return res.status(400).json({
        status: `error`,
        message: `Incorrect user email or password input`,
        success: false,
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    try {
      // Wait for the update operation to complete
      const updateUser = await connectionSource
        .createQueryBuilder()
        .update(User)
        .set({ password: hashedPassword })
        .where("email = :email", { email: email })
        .execute();

      if (updateUser.affected === 0) {
        return res.status(404).json({
          status: `error`,
          message: `User password not updated`,
          success: false,
        });
      }

      return success(res, updateUser, `User password updated successfully`);
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        status: `error`,
        message: `Failed to update user password`,
        success: false,
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      status: `error`,
      message: `Internet error`,
      success: false,
    });
  }
};

export const createNotificationSettingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    console.log("userId 1", userId);
    const {
      communityUpdate,
      emailSummary,
      newMessages,
      followUpdate,
      specialOffers,
    } = req.body;
    const notificationSettingRepository =
      connectionSource.getRepository(NotificationSetting);

    const isExistingUser = await userRespository.findOneBy({
      id: userId,
    });

    if (!isExistingUser) {
      return res.status(404).json({
        status: `error`,
        message: `User does not exist`,
        success: false,
      });
    }
    console.log("userId ", userId);
    const notificationSetting = new NotificationSetting();
    notificationSetting.userId = userId;
    notificationSetting.communityUpdate = communityUpdate || false;
    notificationSetting.emailSummary = emailSummary || false;
    notificationSetting.newMessages = newMessages || false;
    notificationSetting.followUpdate = followUpdate || false;
    notificationSetting.specialOffers = specialOffers || false;

    const notificationInfo = await notificationSettingRepository.save(
      notificationSetting
    );

    if (!notificationInfo) {
      res.status(404).json({
        status: `error`,
        message: `Notification settings not activated`,
        success: false,
      });
    }

    success(res, notificationInfo, `activated notification`);
  } catch (error) {
    console.log(error),
      res.status(500).json({
        status: `error`,
        message: `Internet error`,
        success: false,
      });
  }
};

export const deleteUserAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const isExistingUser = await userRespository.findOne({
      where: { id: userId },
    });

    if (!isExistingUser) {
      return res.status(404).json({
        status: `error`,
        message: `User does not exist`,
        success: false,
      });
    }

    try {
      // Wait for the delete operation to complete
      const destroyAccount = await connectionSource
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: userId })
        .execute();
      console.log("destroyAccount", destroyAccount);
      if (destroyAccount.affected === 0) {
        return res.status(404).json({
          status: `error`,
          message: `Account not deleted`,
          success: false,
        });
      }

      return res.status(200).json({
        status: `success`,
        message: `Account deleted successfully`,
        data: destroyAccount,
        success: true,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        status: `error`,
        message: `Failed to delete account`,
        success: false,
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      status: `error`,
      message: `Internet error`,
      success: false,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userId = req.params.id;
    const userModel = connectionSource.getRepository(User);
    const user = await userModel.findOneBy({ id: userId });

    if (!user) {
      return error(
        res,
        "User does not exist. Please provide a valid User ID",
        400
      );
    }

    if (user.email === email) {
      return error(
        res,
        "Email is the same as the current one. Please choose a different email address",
        400
      );
    }

    user.email = email;
    user.password = password;

    const updatedUser = await userModel.update(userId, user);

    if (!updatedUser) {
      return error(res, "Error updating user", 400);
    }

    return success(res, user, "User updated successfully");
  } catch (err) {
    console.error("Error:", err);
    return error(res, err?.message);
  }
};

export const updateNotificationSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      emailSummary,
      specialOffers,
      communityUpdate,
      followUpdate,
      newMessages,
      userId,
    } = req.body;
    const notificationModel =
      connectionSource.getRepository(NotificationSetting);

    const notificationId = Number(req.params.id);

    const notification = await notificationModel.findOneBy({
      id: notificationId,
    });

    if (!notification) {
      return error(
        res,
        "Cannot find notification. Please provide a valid Notification ID",
        400
      );
    }

    notification.emailSummary = emailSummary;
    notification.specialOffers = specialOffers;
    notification.communityUpdate = communityUpdate;
    notification.followUpdate = followUpdate;
    notification.newMessages = newMessages;
    notification.userId = userId;

    const updateNotification = await notificationModel.update(
      notificationId,
      notification
    );

    if (!updateNotification) {
      return error(res, "Error updating notification", 400);
    }

    return success(res, notification, "Notification updated successfully");
  } catch (err) {
    console.log("error", err?.message);
    return error(res, err?.message);
  }
};
