import { Request, Response, NextFunction } from "express";
import { success } from "../utils";
import { NotificationSetting } from "../entity/model";
import { AppDataSource } from "../data-source";
import { User } from "../entity/model";
import { accountSettingSchema } from "../utils/validation";
import { hashPassword } from "../utils/helper";

const userRespository = AppDataSource.getRepository(User);

export const resetAccountSettingController = async (
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
      res.status(404).json({
        status: `error`,
        message: `User not found`,
        success: false,
      });
    }

    if (currentPassword !== user.password) {
      res.status(400).json({
        status: `error`,
        message: `incorrect user email or password input`,
        success: false,
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    const updateUser = AppDataSource.createQueryBuilder()
      .update(User)
      .set({ password: hashedPassword })
      .where("email = :email", { email: email })
      .execute();

    if (!updateUser) {
      res.status(404).json({
        status: `error`,
        message: `User password not updated`,
        success: false,
      });
    }

    success(res, updateUser, `User password updated successfully`);
  } catch (error) {
    res.status(500).json({
      status: `error`,
      message: `Internet error`,
      success: false,
      data: console.log(error),
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

    const notificationSettingRepository =
      AppDataSource.getRepository(NotificationSetting);

    const isExistingUser = await notificationSettingRepository.findOne({
      where: { userId },
    });

    if (!isExistingUser) {
      res.status(404).json({
        status: `error`,
        message: `User does not exist`,
        successful: false,
      });
    }

    const notificationSetting = new NotificationSetting();
    notificationSetting.communityUpdate = false;
    notificationSetting.emailSummary = false;
    notificationSetting.newMessages = false;
    notificationSetting.followUpdate = false;
    notificationSetting.specialOffers = false;
    notificationSetting.userId = userId;

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
    res.status(500).json({
      status: `error`,
      message: `Internet error`,
      success: false,
      data: console.log(error),
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
      res.status(404).json({
        status: `error`,
        message: `User does not exist`,
        successful: false,
      });
    }

    const destroyAccount = AppDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: userId })
      .execute();

    if (!destroyAccount) {
      res.status(404).json({
        status: `error`,
        message: `account not deleted`,
        successful: false,
      });
    }

    res.status(200).json({
      status: `success`,
      message: `Account deleted successfully`,
      data: destroyAccount,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      status: `error`,
      message: `Internet error`,
      success: false,
      data: console.log(error),
    });
  }
};
