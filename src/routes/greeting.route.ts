// this is an example file
import express from "express";
import { sayHelloController } from "../controllers/greeting.controller";

const router = express.Router();

router.get("/", sayHelloController);

module.exports = router;
