import express from "express";
import { z } from "zod";
import {
  createInterest,
  getInterests,
  updateInterest,
  deleteInterest,
} from "../controllers/interests.controller";
import {
  validateCreateSchema,
  validateUpdateInterest,
  validateUserId,
  createInterestSchema,
  updateInterestsSchema,
  userIdSchema,
} from "../middlewares/interests.zod";

const router = express.Router();

// Add interests

/**
 * @swagger
 * /api/v1/interests:
 *   post:
 *     summary: Create user interests.
 *     description: Create section for user interests.
 *     tags: [Interests]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: InterestsDetails
 *         description: The data for the Interests details to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             interests:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Sports", "Music"]
 *             userId:
 *               type: string
 *               example: "ba9064cc-8208-4092-8f94-ff94e281d534"
 *             sectionId:
 *               type: number
 *               example: 2
 *     responses:
 *       201:
 *         description: Interests details successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Failed to create Interests details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Could not create interests."
 *                 error:
 *                   type: string
 */

router.post(
  "/interests",
  validateCreateSchema(createInterestSchema),
  createInterest
);

// Get interests

/**
 * @swagger
 * /api/v1/interests/{userId}:
 *   get:
 *     summary: Fetch user interests.
 *     description: Fetch the interests of a user.
 *     tags:
 *       - Interests
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The ID of the user whose interests are to be fetched.
 *         required: true
 *         schema:
 *           type: string
 *           example: "ba9064cc-8208-4092-8f94-ff94e281d534"
 *     responses:
 *       200:
 *         description: Successful response with user interest details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Internal server error while retrieving interests.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error occurred."
 *                 error:
 *                   type: string
 *                   example: "Error message details"
 *       400:
 *         description: Invalid userId format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid userId format. Please provide a valid user ID."
 *                 error:
 *                   type: string
 */

router.get("/interests/:userId", validateUserId(userIdSchema), getInterests);

// Update interests

/**
 * @swagger
 * /api/v1/interests/{userId}:
 *   put:
 *     summary: Update user interests.
 *     description: Update the interests of a user.
 *     tags:
 *       - Interests
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The ID of the user whose interests are to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           example: "ba9064cc-8208-4092-8f94-ff94e281d534"
 *       - in: body
 *         name: UpdateDetails
 *         description: Data for updating user interests.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             interests:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Teaching", "Technology"]
 *     responses:
 *       200:
 *         description: Interests details successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     interestArray:
 *                       type: array
 *                       items:
 *                         type: string
 *       500:
 *         description: Failed to update interests.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Could not update interests."
 *                 error:
 *                   type: string
 */

router.put(
  "/interests/:userId",
  validateUserId(userIdSchema),
  validateUpdateInterest(updateInterestsSchema),
  updateInterest
);

// Delete interest

/**
 * @swagger
 * /api/v1/interests/{userId}:
 *   delete:
 *     summary: Delete user interests.
 *     description: Delete the interests of a user.
 *     tags:
 *       - Interests
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The ID of the user whose interests are to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "ba9064cc-8208-4092-8f94-ff94e281d534"
 *     responses:
 *       200:
 *         description: Interests details successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 deletedInterest:
 *                   type: object
 *       500:
 *         description: Failed to delete interests.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Could not delete interest."
 *                 error:
 *                   type: string
 */

router.delete(
  "/interests/:userId",
  validateUserId(userIdSchema),
  deleteInterest
);

module.exports = router;
