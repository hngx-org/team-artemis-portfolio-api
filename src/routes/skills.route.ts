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
 * /create-skills:
 *   post:
 *     summary: Create new skills
 *     description: Create one or more skills for a user.
 *     tags: [Skills]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         description: authorization header
 *       - in: body
 *         name: skillData
 *         description: The data for the skills to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string 
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

router.get("/skills-details", getSkillsDetails);

/**
 * @swagger
 * /update-skills/{id}:
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
 * /delete-skills/{id}:
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
