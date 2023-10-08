// this is an example file
import express, { Router } from "express";
import { sayHelloController } from "../controllers/greeting.controller";

const router: Router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a greeting message
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
 *     tags:
 *       - Greeting
 */
router.get("/", sayHelloController);

module.exports = router;
