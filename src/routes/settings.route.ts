import { Router } from "express";
import {
  createNotificationSettingController,
  deleteUserAccount,
  updateAccountSettingController,
  updateNotificationSettings,
} from "../controllers/settings.controller";
import { validateUserId , validate } from "../services";

const router = Router();

/**
 * @swagger
 * /api/create-account-settings:
 *   put:
 *     summary: Create account settings
 *     description: Create user account settings.
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

router.patch("/update-account-settings", updateAccountSettingController);

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
  "/set-notification-settings/:userId",validateUserId,validate,
  createNotificationSettingController
);

/**
 * @swagger
 * /api/delete-account/{userId}:
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

router.delete("/delete-account/:userId", validateUserId, validate, deleteUserAccount);

/**
 * @swagger
 * /api/update-notification-settings/{id}:
 *   patch:
 *     summary: Update Notification Settings
 *     description: Update user notification settings.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notification settings to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: New notification settings data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailSummary:
 *                 type: boolean
 *                 description: Indicates whether email summary notifications are enabled.
 *               specialOffers:
 *                 type: boolean
 *                 description: Indicates whether special offers notifications are enabled.
 *               communityUpdate:
 *                 type: boolean
 *                 description: Indicates whether community update notifications are enabled.
 *               followUpdate:
 *                 type: boolean
 *                 description: Indicates whether follow update notifications are enabled.
 *               newMessages:
 *                 type: boolean
 *                 description: Indicates whether new message notifications are enabled.
 *               userId:
 *                 type: string
 *                 description: The ID of the user for whom the notification settings are being updated.
 *     responses:
 *       200:
 *         description: Notification settings updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request. Notification settings do not exist.
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

router.patch("/update-notification-settings/:id", updateNotificationSettings);

module.exports = router;
