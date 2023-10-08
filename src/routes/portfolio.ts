import {
  getAllUsers,
  getUserById,
  deletePortfolio,
} from "../controllers/portfolio";
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

// delete portfolio
router.delete("/portfolio/:id", deletePortfolio);

/**
 * @swagger
 * /portfolio/:id:
 *   delete:
 *     summary: Delete a Portfolio section.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of Portfolio to delete.
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
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *     tags:
 *       - Portfolio
 */

module.exports = router; // Export the router
