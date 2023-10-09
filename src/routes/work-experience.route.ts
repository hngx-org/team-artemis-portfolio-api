import express from "express";
import {
  createWorkExperience,
  deleteWorkExperience,
  workExperienceController,
  updateWorkExperience,
} from "../controllers/work-experience.controller";

const router = express.Router();

/**
 * @swagger
 * /api/create-work-experience:
 *   post:
 *     summary: Create a new work experience.
 *     requestBody:
 *       required: true
 *       description: This will contain all the information that will be added to the new work experience.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               role:
 *                 type: string
 *               startMonth:
 *                 type: string
 *               startYear:
 *                 type: string
 *               endMonth:
 *                 type: string
 *               endYear:
 *                 type: string
 *               description:
 *                 type: string
 *               isEmployee:
 *                 type: boolean
 *               userId:
 *                 type: string  # Change 'uuid' to 'string' for consistency
 *               sectionId:
 *                 type: integer  # Change 'number' to 'integer'
 *     responses:
 *       200:
 *         description: Added Work Experience Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     tags:
 *       - Work Experience
 */

router.post("/create-work-experience", createWorkExperience);

/**
 * @swagger
 * /api/work-experience/:id:
 *   delete:
 *     summary: Delete a work experience section.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the work experience section to delete.
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
 *       - Work Experience
 */
router.delete("/work-experience/:id", deleteWorkExperience);

/**
 * @swagger
 * /api/work-experience:
 *   get:
 *     summary: Get all work experience sections.
 *     description: Get all work experience sections from Database.
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
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     tags:
 *       - Work Experience
 */
router.get("/work-experience", workExperienceController);

/**
 * @swagger
 * /api/work-experience/{workId}:
 *   put:
 *     summary: Update a work experience section by ID.
 *     parameters:
 *       - in: path
 *         name: workId
 *         required: true
 *         description: The ID of the work experience section to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New work experience data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               role:
 *                 type: string
 *               startMonth:
 *                 type: string
 *               startYear:
 *                 type: string
 *               endMonth:
 *                 type: string
 *               endYear:
 *                 type: string
 *               description:
 *                 type: string
 *               isEmployee:
 *                 type: boolean
 *               userId:
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
 *       - Work Experience
 */
router.put("/work-experience/:workId", updateWorkExperience);

module.exports = router;
