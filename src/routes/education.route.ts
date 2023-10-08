import express from "express";
import {
  createEducationDetailController,
  fetchEducationSection,
} from "../controllers/education.controller";

const router = express.Router();

router.get("/education/:id", fetchEducationSection);

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

module.exports = router;
