import {
  getAllPortfolioDetails,
  getPortfolioDetails,
  updatePortfolioDetails,
  deletePortfolioDetails,
} from "../controllers/userportfolio.controller";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /api/getPortfolioDetails/{userId}:
 *   get:
 *     summary: Get all portfolio details including sections
 *     description: Get request to retrieve all portfolio details for a user.
 *     tags: [User Portfolio Details]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The userId of the user requesting portfolio details.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 data:
 *                   type: object
 *                   description: Portfolio details.
 *                 successful:
 *                   type: boolean
 *                   description: true
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                 successful:
 *                   type: boolean
 *                   description: false
 *                 data:
 *                   type: string
 *                   description: null
 */
router.get("/getPortfolioDetails/:userId", getPortfolioDetails);

/**
 * @swagger
 * /api/portfolioDetails:
 *   get:
 *     summary: Get all portfolio details
 *     description: Retrieve a list of all users' portfolio details.
 *     tags: [User Portfolio Details]
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
 */
router.get("/portfolioDetails", getAllPortfolioDetails);

/**
 * @swagger
 * /api/profile-details/{id}:
 *   put:
 *     summary: Update portfolio details by ID
 *     description: Update a user's portfolio details by providing its ID.
 *     tags: [User Portfolio Details]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the portfolio details to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated portfolio detail data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: number
 *     responses:
 *       200:
 *         description: Portfolio details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Portfolio details not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.put("/profile-details/:id", updatePortfolioDetails);

/**
 * @swagger
 * /api/profile-details/{id}:
 *   delete:
 *     summary: Delete a Portfolio Profile details
 *     description: Delete a user's Portfolio Profile details by providing its ID.
 *     tags: [User Portfolio Details]
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
 */
router.delete("/profile-details/:id", deletePortfolioDetails);

module.exports = router;
