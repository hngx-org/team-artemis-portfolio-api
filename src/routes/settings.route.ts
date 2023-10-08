// this is an example file
import express from "express";
import {
  updateNotificationSettings,
  updateUser,
} from "../controllers/settings.controller";

const router = express.Router();

router.patch("/settings/:id", updateUser);
router.patch("/settings/notification/:id", updateNotificationSettings);

module.exports = router;
