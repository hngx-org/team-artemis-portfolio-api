import express from "express";
import {
  createDegreeController,
  fetchDegree,
} from "../controllers/degree.controller";

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

/**
 * @swagger
 * /api/degree/{id}:
 *   get:
 *     summary: Get a degree by id
 *     description: Get a single degree by providing its ID.
 *     tags: [Degree]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the degree.
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
router.get("/degree/:id", fetchDegree);
module.exports = router;
