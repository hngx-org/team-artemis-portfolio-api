import express from "express";
import multer from "multer";
import {
  createProfileController,
  getAllUsers,
  getUserById,
  uploadImageController,
} from "../controllers";
import {
  createPorfolioDataSchema,
  validateCreatePortfolioDetails,
} from "../middlewares/profile.zod";

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 1);

const router = express.Router();
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
 * /api/profile/{userId}:
 *   post:
 *     summary: Create Portfolio profile
 *     description: Create a portfolio.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The id of the user.
 *         type: uuid
 *       - in: body
 *         name: createPortfolioDetails
 *         description: New portfolio detail
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             city:
 *               type: string
 *             country:
 *               type: string
 *             trackId:
 *               type: string
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
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post(
  "/profile/:userId",
  validateCreatePortfolioDetails(createPorfolioDataSchema),
  createProfileController
);

module.exports = router;
