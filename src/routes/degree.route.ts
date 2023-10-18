import express from "express";
import {
  createDegreeController,
  fetchDegree,
  fetchAllDegree,
  updateExisitingDegree,
  deleteDegree,
} from '../controllers/degree.controller'

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

/**
 * @swagger
 * /api/degree:
 *   get:
 *     summary: Get all Degrees
 *     description: Retrieve a list of all degrees.
 *     tags: [Degree]
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
 * '404':
 *         description: Not Found
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
 */
router.get("/degree", fetchAllDegree);

/**
 * @swagger
 * /api/degree/{Id}:
 *   put:
 *     summary: Update a degree by ID.
 *     description: Update a degree's information by providing its ID.
 *     parameters:
 *       - in: path
 *         name: degreeId
 *         description: The ID of the degree to update.
 *         required: true
 *         type: integer
 *       - in: body
 *         name: updateDegree
 *         description: New  Degree data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *
 *         example:
 *           type: "Masters degree"
 *
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *       '404':
 *         description: Not Found
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
 *       '500':
 *         description: Internal Server Error
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
 *                   example: "Failed to degree"
 *                 data:
 *                   type: null
 *     tags:
 *       - Degree
 */
router.put("/degree/:id", updateExisitingDegree);

/**
 * @swagger
 * /api/degree/{id}:
 *   delete:
 *     summary: Delete a degree by id
 *     description: Delete a single degree by providing its ID.
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
router.delete('/degree/:degreeId', deleteDegree)

module.exports = router;
