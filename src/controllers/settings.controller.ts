import { Request, Response } from "express";
import { connectionSource } from "../database/data-source";
import { User } from "../database/entity/user";
import { error, success } from "../utils";
import { NotificationSetting } from "../database/entity/model";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userId = req.params.id;
    const userModel = connectionSource.getRepository(User);
    const user = await userModel.findOneBy({ id: userId });

    if (!user) {
      return error(
        res,
        "User does not exist. Please provide a valid user ID.",
        400
      );
    }

    if (user.email === email) {
      return error(
        res,
        "The email you provided is the same as your current email address. Please choose a different email address.",
        400
      );
    }
    user.email = email;
    user.password = password;

    const updatedUser = await userModel.update(userId, user);

    if (!updatedUser) {
      return error(res, "Error updating user", 400);
    }
    const userInfo = await userModel.findOneBy({ id: userId });
    return success(res, userInfo, "User updated successfully");
  } catch (err) {
    console.log("error", err?.message);
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

    const savedNotification = await notificationModel.update(
      notificationId,
      notification
    );

    if (!savedNotification) {
      return error(res, "Error updating notification", 400);
    }
    const notificationInfo = await notificationModel.findOneBy({
      id: notificationId,
    });
    return success(res, notificationInfo, "Notification updated successfully");
  } catch (err) {
    console.log("error", err?.message);
    return error(res, err?.message);
  }
};
