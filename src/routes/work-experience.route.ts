import express from 'express'
import {
  createWorkExperience,
  deleteWorkExperience,
  workExperienceController,
  updateWorkExperience,
} from '../controllers/work-experience.controller'

const router = express.Router()

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

router.post('/create-work-experience', createWorkExperience)

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
router.delete('/work-experience/:id', deleteWorkExperience)

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
router.get('/work-experience', workExperienceController)


/**
 * @swagger
 * /api/update-work-experience/{workId}:
 *   put:
 *     summary: Update a work experience by ID.
 *     description: Update a work experience's information by providing its ID.
 *     parameters:
 *       - in: path
 *         name: workId
 *         description: The ID of the work experience to update.
 *         required: true
 *         type: integer
 *       - in: body
 *         name: updatedWorkExperienceData
 *         description: The updated data for the work experience.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: updateWorkExperience
 *         description: New work experience data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             company:
 *               type: string
 *             role:
 *               type: string
 *             startMonth:
 *               type: string
 *             startYear:
 *               type: string
 *             endMonth:
 *               type: string
 *             endYear:
 *               type: string
 *             description:
 *               type: string
 *             isEmployee:
 *               type: boolean
 *             userId:
 *               type: string
 *             sectionId:
 *               type: integer
 *         example:
 *           company: "Interna"
 *           role: "Mobile Intern"
 *           startMonth: "August"
 *           startYear: "2022"
 *           endMonth: "October"
 *           endYear: "2023"
 *           description: "I developed web applications using Next.js"
 *           isEmployee: true
 *           userId: "550e8400-e29b-41d4-a716-446655440000"
 *           sectionId: 1
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
 *                   example: "Failed to update Work Experience"
 *                 data:
 *                   type: null
 *     tags:
 *       - Work Experience
 */

router.put('/work-experience/:workId', updateWorkExperience)

module.exports = router
