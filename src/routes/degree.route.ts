import express from "express";
import { createDegreeController } from "../controllers/degree.controller";

const router = express.Router();

/**
 * @swagger
 * /api/degree:
 *   post:
 *     summary: Update education details for a user by its ID.
 *     description: Update education details for a user by its ID.
 *     tags: [Degree]
 *     parameters:
 *       - in: body
 *         name: degreeDetails
 *         description: New education detail data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             type:
  *                 type: string
 *                 example: "Master's of Science"

 *     responses:
 *       200:
 *         description: Education details successfully updated.
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: boolean
 *             message:
 *               type: string
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
router.post("/degree", createDegreeController);

module.exports = router;
