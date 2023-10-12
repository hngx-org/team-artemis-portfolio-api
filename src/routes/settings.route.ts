import { Router } from "express";
import {
  createNotificationSettingController,
  deleteUserAccount,
  updateUserAccountSettingController,
  updateNotificationSettings,
  getUserNotificationSettings,
} from "../controllers/settings.controller";
import { validateUserId, validate } from "../services";

const router = Router();

/**
 * @swagger
 * /api/update-user-account-settings:
 *   patch:
 *     summary: update account settings
 *     description: update user account password settings.
 *     requestBody:
 *       description: New account settings
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmNewPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Notification settings detail data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               communityUpdate:
 *                 type: boolean
 *               emailSummary:
 *                 type: boolean
 *               newMessages:
 *                 type: boolean
 *               followUpdate:
 *                 type: boolean
 *               specialOffers:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *         schema:
 *           type: string
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
 *         example:
 *           emailSummary: true
 *           specialOffers: false
 *           communityUpdate: true
 *           followUpdate: false
 *           newMessages: true
 *           userId: "user123"
 *     responses:
 *       200:
 *         description: Notification settings updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/NotificationSettings'
 *       400:
 *         description: Bad request. Invalid input or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       404:
 *         description: User not found. Please provide a valid User ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification settings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NotificationSettings'
 *       400:
 *         description: Bad request. User or notification settings do not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *     tags:
 *       - Settings
 */

router.get("/get-notification-settings/:userId", getUserNotificationSettings);

module.exports = router;
