import express from "express";
import {
  createSkills,
  updateSkills,
  getSkillsDetails,
  deleteSkills,
} from "../controllers/skills.controller";

const router = express.Router();

/**
 * @swagger
 * /api/create-skills:
 *   post:
 *     summary: Create new skills
 *     description: Create one or more skills for a user.
 *     tags: [Skills]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         description: Optional authorization header
 *       - in: body
 *         name: skillData
 *         description: The data for the skills to be created.
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               skills:
 *                 type: string
 *               sectionId:
 *                 type: number
 *               userId:
 *                 type: string
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
router.post("/create-skills", createSkills);

/**
 * @swagger
 * /api/skills-details:
 *   get:
 *     summary: Fetch skills for a logged-in user.
 *     description: Retrieve skills for a logged-in user based on their user ID.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token for authentication.
 *         required: false
 *         type: string
 *       - in: query
 *         name: userId
 *         description: The user ID for which to fetch skills.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response containing skills data.
 *         schema:
 *           type: object
 *           properties:
 *             successful:
 *               type: boolean
 *               description: Indicates whether the request was successful.
 *             message:
 *               type: string
 *               description: A message describing the result (e.g., "Skills").
 *             data:
 *               type: array
 *               description: An array of skill objects.
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the skill.
 *                   skills:
 *                     type: string
 *                     description: The skill name.
 *                   userId:
 *                     type: string
 *                     description: The user ID associated with the skill.
 *                   sectionId:
 *                     type: integer
 *                     description: The section ID associated with the skill.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
 *       401:
 *         description: Unauthorized. Authentication failed or token is missing.
 *       404:
 *         description: User not found or no skills found for the specified user.
 *       500:
 *         description: Internal server error.
 *     tags:
 *       - Skills
 */
router.get("/skills-details", getSkillsDetails);

/**
 * @swagger
 * /api/update-skills/{id}:
 *   put:
 *     summary: Update a skill by ID.
 *     description: Update a skill's information by providing its ID.
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the skill to update.
 *         required: true
 *         type: integer
 *       - in: body
 *         name: updatedSkillData
 *         description: The updated data for the skill.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             skills:
 *               type: string
 *             sectionId:
 *               type: number
 *             userId:
 *               type: string
 *     responses:
 *       200:
 *         description: Skill updated successfully.
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
 *                   example: "Success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "skill updated successfully"
 *       404:
 *         description: Skill not found.
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
 *                   example: "skill not found"
 *                 data:
 *                   type: null
 *       500:
 *         description: Failed to update skill.
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
 *                   example: "Failed to update skill"
 *                 data:
 *                   type: null
 */
router.put("/update-skills/:id", updateSkills);

/**
 * @swagger
 * /api/delete-skills/{id}:
 *   delete:
 *     summary: Delete a skill by ID
 *     description: Delete a skill by providing its ID.
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the skill to delete.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Skill deleted successfully.
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
 *                   example: "Success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Skill deleted successfully"
 *       404:
 *         description: Skill not found.
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
 *                   example: "Skill not found"
 *                 data:
 *                   type: null
 *       500:
 *         description: Failed to delete skill.
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
 *                   example: "Failed to delete skill"
 *                 data:
 *                   type: null
 */
router.delete("/delete-skills/:id", deleteSkills);

module.exports = router;
