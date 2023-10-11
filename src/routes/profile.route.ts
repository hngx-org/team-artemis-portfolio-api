import express from "express";
import multer from "multer";
import {
  createProfileController,
  deletePortfolioDetails,
  updatePortfolioDetails,
  uploadProfileImageController,
} from "../controllers";

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 1);

const router = express.Router();

/**
 * @swagger
 * /api/profile-details/{id}:
 *   put:
 *     summary: Update portfolio details by ID
 *     description: Update a user's portfolio details by providing its ID.
 *     tags: [Profile]
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
 * /api/profile/{userId}:
 *   post:
 *     summary: Create Portfolio profile
 *     description: Create a portfolio.
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The id of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New profile detail data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - trackId
 *               - city
 *               - country
 *             properties:
 *               name:
 *                 type: string
 *               trackId:
 *                 type: number
 *               city:
 *                 type: string
 *               country:
 *                 type: string
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
router.post("/profile/:userId", createProfileController);

/**
 * @swagger
 * /api/profile-details/{id}:
 *   delete:
 *     summary: Delete a Portfolio Profile details
 *     description: Delete a user's Portfolio Profile details by providing its ID.
 *     tags: [Portfolio]
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
