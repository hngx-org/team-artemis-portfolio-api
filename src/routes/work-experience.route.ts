import express from "express";
import {
  createWorkExperience,
  deleteWorkExperience,
} from "../controllers/work-experience.controller";

const router = express.Router();

/**
 * @swagger
 * /create-work-experience:
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
 * /work-experience/:id:
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

module.exports = router;
