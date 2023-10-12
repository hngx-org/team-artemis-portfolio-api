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
 * /api/portfolio:
 *   get:
 *     summary: Get all users' portfolio details
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
router.get("/portfolio", getAllUsers);

/**
 * @swagger
 * /api/portfolio/{userId}:
 *   get:
 *     summary: Get user portfolio details by ID
 *     description: Retrieve a user's portfolio details by providing their ID.
 *     tags: [User Portfolio Details]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose portfolio details are to be retrieved.
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
 *         description: Requested user not found
 */
router.get("/portfolio/:userId", getUserById);

/**
 * @swagger
 * /api/getPortfolioDetails/{userId}:
 *   get:
 *     summary: Get all portfolio details including sections
 *     description: Get request to retrieve all portfolio details for a user.
 *     tags: [Portfolio]
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
 *     summary: Get all users' portfolio details
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

module.exports = router;
