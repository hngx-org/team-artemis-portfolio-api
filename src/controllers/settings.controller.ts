import { Request, Response, NextFunction } from "express";
import { success, error } from "../utils";
import { ZodError } from "zod";
import { connectionSource } from "../database/data-source";
import {
  accountSettingSchema,
  hashPassword,
  validateNotificataionSettingsData,
  verifyPassword,
} from "../services/settings.service";
import { NotificationSettings } from "../interfaces/settings.interface";
import { NotificationSetting, User } from "../database/entities";
import { NotFoundError, errorHandler } from "../middlewares";
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

    const isExistingUser = await userRespository.findOneBy({
      id: userId,
    });

    if (!isExistingUser) {
      throw new NotFoundError(`User does not exist`);
    }

    const hasExistingNotificationPreferences =
      await notificationSettingRepository.find({
        where: { user: { id: userId } },
      });

    if (hasExistingNotificationPreferences.length > 0) {
      const isValidData = await validateNotificataionSettingsData(
        req,
        res,
        true
      );
      if (!isValidData) {
        return;
      }

      const updateNotification =
        hasExistingNotificationPreferences.slice(-1)?.[0];

      updateNotification.communityUpdate =
        communityUpdate ?? updateNotification.communityUpdate;
      updateNotification.emailSummary =
        emailSummary ?? updateNotification.emailSummary;
      updateNotification.newMessages =
        newMessages ?? updateNotification.newMessages;
      updateNotification.followUpdate =
        followUpdate ?? updateNotification.followUpdate;
      updateNotification.specialOffers =
        specialOffers ?? updateNotification.specialOffers;

      const updatedNotification = await notificationSettingRepository.save(
        updateNotification
      );

      return success(
        res,
        updatedNotification,
        `Notification updated successfully`
      );
    }

    const hasPassedValidation = await validateNotificataionSettingsData(
      req,
      res
    );
    if (!hasPassedValidation) {
      return;
    }

    const notificationSetting = new NotificationSetting();
    notificationSetting.communityUpdate = communityUpdate || false;
    notificationSetting.emailSummary = emailSummary || false;
    notificationSetting.newMessages = newMessages || false;
    notificationSetting.followUpdate = followUpdate || false;
    notificationSetting.specialOffers = specialOffers || false;
    notificationSetting.user = isExistingUser;

    const notificationInfo = await notificationSettingRepository.save(
      notificationSetting
    );

    if (!notificationInfo) {
      throw new NotFoundError(
        "Notification not found. Ensure you are passing a valid User ID"
      );
    }

    // Remove the user property from the response object
    Reflect.deleteProperty(notificationInfo, "user");

    success(res, notificationInfo, `activated notification`);
  } catch (error) {
    console.log(error);
    return errorHandler(error, req, res, next);
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
      where: {
        user: {
          id: userId,
        },
      },
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
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;

    const user = await userRespository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError("Please provide a valid User ID");
    }

    const notificationModel =
      connectionSource.getRepository(NotificationSetting);

    const notifications = await notificationModel.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: { id: "DESC" },
      take: 1,
    });

    return success(res, notifications, "Notifications fetched successfully");
  } catch (err) {
    console.log("error", err?.message);
    return errorHandler(err, req, res, next);
  }
};
