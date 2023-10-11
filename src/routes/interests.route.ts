import express from "express";
import { z } from "zod";
import { createInterest } from "../controllers/interests.controller";
import { validateSchema } from "../middlewares/custom.zod";

const router = express.Router();

// Create interest schema
const interestSchema = z.object({
  interests: z.array(
    z.string({
      required_error: "Interests are required",
      invalid_type_error: "Interests must be a string",
    })
  ),
  userId: z.string().uuid({ message: "userId must be a valid uuid" }),
  sectionId: z.number({
    required_error: "sectionId is required",
    invalid_type_error: "sectionId must be a number",
  }),
});

// Add interests

/**
 * @swagger
 * /api/interests:
 *   post:
 *     description: Create section for user interests.
 *     tags: [Interests]
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
 *                type: string
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

router.post("/interests", validateSchema(interestSchema), createInterest);

module.exports = router;
