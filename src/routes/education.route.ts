import express from "express";
import { createEducationDetailController, updateEducationDetail } from "../controllers/education.controller";

const router = express.Router();

/**
 * @swagger
 * /api/education/:id:
 *   get:
 *     summary: Get education detail(s) by ID
 *     description: Get education detail(s) for a user who's id is in the params and returns an array of objects containing a user education details.
 *     tags: [Education]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         description: Optional authorization header
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               sectionId:
 *                 type: number
 *               degreeId:
 *                 type: number
 *               fieldOfStudy:
 *                 type: string
 *               school:
 *                 type: string
 *               description:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *
 *     responses:
 *       200:
 *         educationDetails: Array of user education detail(s).
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
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Failed to fetch education detail(s).
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
 *                 data:
 *                   type: null
 */
router.get("/education/:id", fetchEducationDetail);

/**
 * @swagger
 * /api/education/{id}:
 *   post:
 *     summary: Create education details
 *     description: Create education details for a user.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The ID of the education detail to create.
 *       - in: header
 *         name: Authorization
 *         type: string
 *         description: Optional authorization header
 *       - in: body
 *         name: educationDetails
 *         description: The data for the skills to be created.
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               sectionId:
 *                 type: number
 *               degreeId:
 *                 type: number
 *               fieldOfStudy:
 *                 type: string
 *               school:
 *                 type: string
 *               description:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Skills successfully created.
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
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Failed to create skills.
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
 *                 data:
 *                   type: null
 */
router.post("/education/:id", createEducationDetailController);

/**
 * @swagger
 * /updateEducationDetail/{id}:
 *   put:
 *     summary: Update education detail by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the education detail to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New education detail data
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
 *     tags:
 *       - Education
 */
router.put('/updateEducationDetail/:id', updateEducationDetail)

module.exports = router;
