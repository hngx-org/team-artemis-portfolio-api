// this is an example file
import express from "express";
import { sayHelloController } from "../controllers/greeting.controller";
import {
  addNotification,
  createUser,
  updateNotification,
  updateUser,
} from "../controllers/settings.controller";

const router = express.Router();

router.get("/", sayHelloController);
router.post("/settings", createUser);

router.patch("/:id", updateUser);

router.post("/notification", addNotification);
router.patch("/notification/:id", updateNotification);

module.exports = router;
