import express from "express";
import {
  createEducationDetailController,
  updateEducationDetail,
  getEducationDetailById,
  getAllEducationDetails,
  deleteEducationDetail,
} from "../controllers/education.controller";

const router = express.Router();

/**
 * @swagger
 * /api/education:
 *   post:
 *     summary: Create education details
 *     description: Create education details for a user.
 *     tags: [Education]
 *     parameters:
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
router.post("/education/", createEducationDetailController);

/**
 * @swagger
 * /api/education/{id}:
 *   get:
 *     summary: Get education detail by ID
 *     description: Get an education detail by its ID.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the education detail to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Education detail retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 educationDetail:
 *                   type: object
 *       404:
 *         description: Education detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/api/education/:id", getEducationDetailById);

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
 *            *         schema:
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
router.put("/updateEducationDetail/:id", updateEducationDetail);

/**
 * @swagger
 * /api/education/user/{userId}:
 *   get:
 *     summary: Get all education details for a user
 *     description: Get all education details associated with a specific user.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve education details for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Education details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 educationDetails:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: User has no educational details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/api/education/user/:userId", getAllEducationDetails);

/** @swagger
 * /api/education/{id}:
 *   delete:
 *     summary: Delete education detail by ID
 *     description: Delete an education detail by its ID.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the education detail to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Education detail deleted successfully.
 *       404:
 *         description: Education detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/api/education/:id", deleteEducationDetail);

module.exports = router;
