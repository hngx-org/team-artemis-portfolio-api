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
 * /api/interests:
 *   post:
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
 *               example: "550e8400-e29b-41d4-a716-446655440000"
 *             sectionId:
 *               type: number
 *               example: 323
 *     responses:
 *       201:
 *         description: Interests details successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
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
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "invalid input syntax for type integer: \"\""
 *                 error:
 *                   type: string
 */

router.post(
  "/interests",
  validateCreateSchema(createInterestSchema),
  createInterest
);
router.get("/interests/:userId", getInterests);

// Update interests

/**
 * @swagger
 * /api/interests/{userId}:
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
 *         example: "550e8400-e29b-41d4-a716-446655440000"
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
 *                 successful:
 *                   type: boolean
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
 *                 successful:
 *                   type: boolean
 *                   example: false
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
 * /api/interests/{userId}:
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
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Interests details successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
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
 *                 successful:
 *                   type: boolean
 *                   example: false
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
