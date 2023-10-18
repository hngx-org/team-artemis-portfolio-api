import { SectionPositionController } from "../controllers/reordersection.controller";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Section Positions
 *   description: API endpoints for section positions
 */

/**
 * @swagger
 * /api/store-section-positions:
 *   post:
 *     summary: Store section positions in the database with associated tags.
 *     tags: [Section Positions]
 *     requestBody:
 *       description: Section data to be stored with associated tags.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The section's unique identifier.
 *                 name:
 *                   type: string
 *                   description: The section's name.
 *                 position:
 *                   type: integer
 *                   description: The section's position.
 *                 tags:
 *                   type: array
 *                   description: An array of tags associated with the section.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The tag's unique identifier.
 *                       name:
 *                         type: string
 *                         description: The tag's name.
 *     responses:
 *       200:
 *         description: Section positions with associated tags stored successfully.
 *       500:
 *         description: Internal Server Error.
 */
router.post(
  "/store-section-positions",
  SectionPositionController.storeSectionPositions
);

/**
 * @swagger
 * /api/retrieve-section-positions:
 *   get:
 *     summary: Retrieve section positions from the database.
 *     tags: [Section Positions]
 *     responses:
 *       200:
 *         description: Retrieved section positions successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No sections found.
 *       500:
 *         description: Internal Server Error.
 */
router.get(
  "/retrieve-section-positions",
  SectionPositionController.retrieveSectionPositions
);

module.exports = router;
