"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var settings_controller_1 = require("../controllers/settings.controller");
var router = (0, express_1.Router)();
/**
 * @swagger
 * /createAccountSetting:
 *   put:
 *     summary: Create account settings
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
 *       - User
 */
router.put("/createAccountSetting", settings_controller_1.createAccountSettingController);
/**
 * @swagger
 * /setNotificationDetails/{id}:
 *   post:
 *     summary: Create notification settings by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user detail to create its settings.
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
 *       - NotificationSetting
 */
router.post("/setNotificationDetails/:id", settings_controller_1.createNotificationSettingController);
/**
 * @swagger
 * /deleteAccountDetails/{id}:
 *   delete:
 *     summary: Delete user account detail by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user to delete.
 *         schema:
 *           type: string
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
 *       - User
 */
router.delete("/deleteAccountDetails/:id", settings_controller_1.deleteUserAccount);
module.exports = router;
//# sourceMappingURL=settings.route.js.map