"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var portfolio_1 = require("../controllers/portfolio");
var express_1 = require("express");
var router = (0, express_1.Router)(); // Create a new router
router.get("/portfolio", portfolio_1.getAllUsers);
/**
 * @swagger
 * /portfolio/{id}:
 *   get:
 *     summary: Get user portfolio details by ID
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
 *       404:
 *         description: Requested user not found
 *     tags:
 *       - User
 *       - User Portfolio Details
 */
router.get("/portfolio/:id", portfolio_1.getUserById);
module.exports = router; // Export the router
//# sourceMappingURL=portfolio.js.map