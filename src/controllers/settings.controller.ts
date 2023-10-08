import { Request, Response } from "express";
import { connectionSource } from "../database/data-source";
import { User } from "../database/entity/user";
import { error, success } from "../utils";
import { NotificationSetting } from "../database/entity/model";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userModel = connectionSource.getRepository(User);
    const user = await userModel.findOneBy({ id: req.params.id });

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "User does not exist" });
    }

    if (user.email === email) {
      return res.status(400).json({
        status: "error",
        message:
          "The email you provided is the same as your current email address. Please choose a different email address.",
      });
    }
    user.email = email;
    user.password = password;

    const updatedUser = await userModel.update(req.params.id, user);
    return success(res, updatedUser, "User updated successfully");
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

    const notification = await notificationModel.findOneBy({id: notificationId});

    if (!notification) {
      return res
        .status(400)
        .json({ status: "error", message: "Notification does not exist" });
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
    return success(res, savedNotification, "Notification updated successfully");
  } catch (err) {
    console.log("error", err?.message);
    return error(res, err?.message);
  }
};
