// this is an example file
import express from "express";
import {
  updateNotificationSettings,
  updateUser,
} from "../controllers/settings.controller";

const router = express.Router();

/**
 * @swagger
 * /updateUser/{id}:
 *   put:
 *     summary: Update user information
 *     description: Update user email and password.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       description: New User detail data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request. User does not exist or email is the same as the current one.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.patch("/settings/:id", updateUser);

/**
 * @swagger
 * /updateNotificationSettings/{id}:
 *   put:
 *     summary: Update notification settings
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
 *         description: Bad request. Notification does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.patch("/settings/notification/:id", updateNotificationSettings);

module.exports = router;
