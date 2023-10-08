import express from 'express'
const router = express.Router()
import WorkExperienceController from '../controllers/work-experience.controller';


/**
 * @swagger
 * /api/work-experience:
 *   get:
 *     summary: Fetch all work experiences
 *     description: Retrieve a list of all work experiences.
 *     responses:
 *       200:
 *         description: Successfully retrieved work experiences.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 workExperiences:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WorkExperienceDetail'
 *       500:
 *         description: Internal server error.
 */

router.get('/work-experience', WorkExperienceController.getWorkExperience);

module.exports = router;

