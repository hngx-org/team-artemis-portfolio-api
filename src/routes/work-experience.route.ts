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
 * /api/v1/create-work-experience/{userId}:
 *   post:
 *     summary: Create a new work experience.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user.
 *         type: string
 *       - in: formData
 *         name: company
 *         type: string
 *       - in: formData
 *         name: role
 *         type: string
 *       - in: formData
 *         name: startMonth
 *         type: string
 *       - in: formData
 *         name: startYear
 *         type: string
 *       - in: formData
 *         name: endMonth
 *         type: string
 *       - in: formData
 *         name: endYear
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: isEmployee
 *         type: boolean
 *       - in: formData
 *         name: sectionId
 *         type: integer
 *     responses:
 *       200:
 *         description: Added Work Experience Successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             data:
 *               type: object
 *               properties:
 *                 company:
 *                   type: string
 *                 role:
 *                   type: string
 *                 startMonth:
 *                   type: string
 *                 startYear:
 *                   type: string
 *                 endMonth:
 *                   type: string
 *                 endYear:
 *                   type: string
 *                 description:
 *                   type: string
 *                 isEmployee:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *                 sectionId:
 *                   type: integer
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *     tags:
 *       - Work Experience
 */

router.post("/create-work-experience/:userId", createWorkExperience);

/**
 * @swagger
 * /api/v1/work-experience/{id}:
 *   delete:
 *     summary: Delete a work experience section.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the work experience section to delete.
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *     tags:
 *       - Work Experience
 */
router.delete("/work-experience/:id", deleteWorkExperience);

/**
 * @swagger
 * /api/v1/work-experience:
 *   get:
 *     summary: Get all work experience sections.
 *     description: Get all work experience sections from Database.
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *     tags:
 *       - Work Experience
 */
router.get("/work-experience", workExperienceController);

/**
 * @swagger
 * /api/v1/update-work-experience/{workId}:
 *   put:
 *     summary: Update a work experience by ID.
 *     description: Update a work experience's information by providing its ID.
 *     parameters:
 *       - in: path
 *         name: workId
 *         description: The ID of the work experience to update.
 *         required: true
 *         type: integer
 *       - in: formData
 *         name: company
 *         type: string
 *       - in: formData
 *         name: role
 *         type: string
 *       - in: formData
 *         name: startMonth
 *         type: string
 *       - in: formData
 *         name: startYear
 *         type: string
 *       - in: formData
 *         name: endMonth
 *         type: string
 *       - in: formData
 *         name: endYear
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: isEmployee
 *         type: boolean
 *       - in: formData
 *         name: userId
 *         type: string
 *       - in: formData
 *         name: sectionId
 *         type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             data:
 *               type: object
 *       '400':
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *       '404':
 *         description: Not Found
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *       '500':
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: "Failed to update Work Experience"
 *             data:
 *               type: null
 *     tags:
 *       - Work Experience
 */
router.put("/update-work-experience/:workId", updateWorkExperience);

module.exports = router;
