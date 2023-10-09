"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// this is an example file
var express_1 = __importDefault(require("express"));
var greeting_controller_1 = require("../controllers/greeting.controller");
var router = express_1.default.Router();
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
router.get("/", greeting_controller_1.sayHelloController);
module.exports = router;
//# sourceMappingURL=greeting.route.js.map