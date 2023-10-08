import { getAllUsers, getUserById } from "../controllers/portfolio";
import { Router } from "express";

const router = Router(); // Create a new router

router.get("/portfolio", getAllUsers);

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
router.get("/portfolio/:id", getUserById);

module.exports = router; // Export the router
