import { Request, Response, NextFunction } from "express";
import { success, error } from "../utils";
import { ZodError } from "zod";
import { connectionSource } from "../database/data-source";
import {
  accountSettingSchema,
  hashPassword,
  notificationSettingSchema,
  verifyPassword,
} from "../services/settings.service";
import { NotificationSettings } from "../interfaces/settings.interface";
import { NotificationSetting, User } from "../database/entities";
const userRespository = connectionSource.getRepository(User);

export const updateUserAccountSettingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, currentPassword, newPassword, confirmNewPassword } =
      req.body;

    const error = accountSettingSchema.parse({
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    if (error instanceof ZodError) {
      return res.status(404).json({
        status: `error`,
        message: error.errors,
        success: false,
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

    const verifyCurrentPassword = await verifyPassword(
      //bugfix
      currentPassword,
      user.password
    );

    if (!verifyCurrentPassword) {
      return res.status(400).json({
        status: `error`,
        message: `Incorrect current password input`,
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

      success(res, updateUser, `User password updated successfully`);
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

    const {
      communityUpdate,
      emailSummary,
      newMessages,
      followUpdate,
      specialOffers,
    } = req.body;
    const notificationSettingRepository =
      connectionSource.getRepository(NotificationSetting);

    const error = notificationSettingSchema.parse({
      communityUpdate,
      emailSummary,
      newMessages,
      followUpdate,
      specialOffers,
    });

    if (error instanceof ZodError) {
      return res.status(404).json({
        status: `error`,
        message: error.errors,
        success: false,
      });
    }

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

    const notificationSetting: NotificationSettings = new NotificationSetting();
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
      return res.status(400).json({
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

      if (destroyAccount.affected === 0) {
        return res.status(400).json({
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
      return res.status(400).json({
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
    }: NotificationSettings = req.body;
    const userId = req.params.userId;

    if (!userId) {
      return error(res, "Please provide a valid User ID", 400);
    }

    const user = await userRespository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return error(res, "User does not exist", 400);
    }

    const notificationModel =
      connectionSource.getRepository(NotificationSetting);

    const notification = await notificationModel.find({
      order: { id: "DESC" },
      take: 1,
    });

    if (!notification) {
      return error(
        res,
        "Cannot find notification. Please provide a valid User ID",
        400
      );
    }

    const latestNotification = notification[0];

    latestNotification.emailSummary = emailSummary;
    latestNotification.specialOffers = specialOffers;
    latestNotification.communityUpdate = communityUpdate;
    latestNotification.followUpdate = followUpdate;
    latestNotification.newMessages = newMessages;

    const updateNotification = await notificationModel.save(latestNotification);

    if (!updateNotification) {
      return error(res, "Error updating notification", 400);
    }

    return success(
      res,
      updateNotification,
      "Notification updated successfully"
    );
  } catch (err) {
    console.log("error", err?.message);
    return error(res, err?.message);
  }
};

export const getUserNotificationSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return error(res, "Please provide a valid User ID", 400);
    }

    const notificationModel =
      connectionSource.getRepository(NotificationSetting);
    const notifications = await notificationModel.find({
      order: { id: "DESC" },
      take: 1,
    });

    return success(res, notifications, "Notifications fetched successfully");
  } catch (err) {
    console.log("error", err?.message);
    return error(res, (err as Error)?.message);
  }
};
