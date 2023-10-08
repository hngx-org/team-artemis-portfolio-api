import express, { Request, RequestHandler, Response } from "express";
import { connectionSource } from "../database/data-source";
import { User } from "../database/entity/user";
import { error, success } from "../utils";
import { NotificationSetting } from "../database/entity/model";

export const createUser = async (req: Request, res: Response) => {
  const {
    username,
    firstName,
    lastName,
    email,
    sectionOrder,
    password,
    provider,
    isVerified,
  } = req.body;
  try {
    const userModel = connectionSource.getRepository(User);

    const foundUser = await userModel.findOneBy({ email });
    console.log("user", foundUser);

    if (foundUser) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
    }

    const user = new User();

    user.username = username;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.sectionOrder = sectionOrder;
    user.password = password;
    user.provider = provider;
    user.isVerified = isVerified;

    const savedUser = await userModel.save(user);

    console.log("Hello World", savedUser);
    return success(res, savedUser, "User created successfully");
  } catch (error) {
    console.log("error", error.message);
    return error(res, error.message);
  }
};

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
  } catch (error) {
    console.log("error", error.message);
    return error(res, error.message);
  }
};

export const addNotification = async (req: Request, res: Response) => {
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

    const notification = new NotificationSetting();
    notification.emailSummary = emailSummary;
    notification.specialOffers = specialOffers;
    notification.communityUpdate = communityUpdate;
    notification.followUpdate = followUpdate;
    notification.newMessages = newMessages;
    notification.userId = userId;

    const savedNotification = await notificationModel.save(notification);
    return success(res, savedNotification, "Notification added successfully");
  } catch (error) {
    console.log("error", error.message);
    return error(res, error.message);
  }
};

export const updateNotification = async (req: Request, res: Response) => {
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

    const notification = await notificationModel.findOne({
      where: {
        id: notificationId,
      },
    });

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
  } catch (error) {
    console.log("error", error.message);
    return error(res, error.message);
  }
};
