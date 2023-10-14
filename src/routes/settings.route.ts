import { Router } from "express";
import multer from "multer";
import {
  createNotificationSettingController,
  deleteUserAccount,
  updateUserAccountSettingController,
  updateNotificationSettings,
  getUserNotificationSettings,
  uploadUserProfileImageController,
} from "../controllers/settings.controller";
import { validateUserId, validate } from "../services";

import { ForbiddenError } from "../middlewares";
import { NextFunction, Request, Response } from "express";

const router = Router();



const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 1);
const uploadHandler = (req: Request, res: Response, next: NextFunction) => {
  uploads(req, res, function (err) {
    if (err) {
      const newForbbidenError = new ForbiddenError("You can only upload a maximum of 10 images");
      next(newForbbidenError);
    }
    next();
  })
}

/**
 * @swagger
 * /api/update-user-account-settings:
 *   patch:
 *     summary: Update account settings
 *     description: Update user account password settings.
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Email address
 *         required: true
 *         type: string
 *       - in: body
 *         name: currentPassword
 *         description: Current password
 *         required: true
 *         type: string
 *       - in: body
 *         name: newPassword
 *         description: New password
 *         required: true
 *         type: string
 *       - in: body
 *         name: confirmNewPassword
 *         description: Confirm new password
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *     tags:
 *       - Settings
 */

router.patch(
  "/update-user-account-settings",
  updateUserAccountSettingController
);

/**
 * @swagger
 * /api/set-notification-settings/{userId}:
 *   post:
 *     summary: Create notification settings by User ID
 *     description: Create user notification settings by providing the User ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique ID of the user for whom to create notification settings.
 *         type: string
 *       - in: body
 *         name: notificationSettings
 *         description: Notification settings detail data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             communityUpdate:
 *               type: boolean
 *             emailSummary:
 *               type: boolean
 *             newMessages:
 *               type: boolean
 *             followUpdate:
 *               type: boolean
 *             specialOffers:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *     tags:
 *       - Settings
 */

router.post(
  "/set-notification-settings/:userId",
  validateUserId,
  validate,
  createNotificationSettingController
);

/**
 * @swagger
 * /api/delete-user-account/{userId}:
 *   delete:
 *     summary: Delete user account by ID
 *     description: Delete user account by providing the User ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique ID of the user for whom to delete the account.
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *     tags:
 *       - Settings
 */

router.delete(
  "/delete-user-account/:userId",
  validateUserId,
  validate,
  deleteUserAccount
);

/**
 * @swagger
 * /api/update-notification-settings/{userId}:
 *   patch:
 *     summary: Update Notification Settings
 *     description: Update user notification settings for a specified user.
 *     tags: [Settings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: string
 *         description: The ID of the user for whom to update notification settings.
 *       - in: body
 *         name: notificationSettings
 *         description: The data for updating notification settings.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             emailSummary:
 *               type: boolean
 *               description: Indicates whether email summary notifications are enabled.
 *             specialOffers:
 *               type: boolean
 *               description: Indicates whether special offers notifications are enabled.
 *             communityUpdate:
 *               type: boolean
 *               description: Indicates whether community update notifications are enabled.
 *             followUpdate:
 *               type: boolean
 *               description: Indicates whether follow update notifications are enabled.
 *             newMessages:
 *               type: boolean
 *               description: Indicates whether new message notifications are enabled.
 *             userId:
 *               type: string
 *               description: The ID of the user for whom the notification settings are being updated.
 *     responses:
 *       200:
 *         description: Notification settings updated successfully.
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: boolean
 *             message:
 *               type: string
 *       400:
 *         description: Bad request. Invalid input or user not found.
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: boolean
 *             message:
 *               type: string
 *             data:
 *               type: null
 *       404:
 *         description: User not found. Please provide a valid User ID.
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: boolean
 *             message:
 *               type: string
 *             data:
 *               type: null
 */

router.patch(
  "/update-notification-settings/:userId",
  updateNotificationSettings
);

/**
 * @swagger
 * /api/get-notification-settings/{userId}:
 *   get:
 *     summary: Get User Notification Settings
 *     description: Get user notification settings for a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The User's ID for which notification settings are to be retrieved.
 *         type: string
 *     responses:
 *       200:
 *         description: Notification settings retrieved successfully.
 *         schema:
 *           type: array
 *       400:
 *         description: Bad request. User or notification settings do not exist.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *     tags:
 *       - Settings
 */

router.get("/get-notification-settings/:userId", getUserNotificationSettings);

/**
 * @swagger
 * /api/userprofile/image/upload:
 *   post:
 *     summary: Upload a profile image
 *     description: Upload a user's profile image using a POST request.
 *     tags: [User Portfolio Details]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: The profile image to upload (one file allowed).
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad request. The uploaded file may not be valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *     multipart: true
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

router.post("/userprofile/image/upload", uploadHandler, uploadUserProfileImageController);
module.exports = router;
