import express from "express";
import {
  deleteWorkExperience,
} from "../controllers/work-experience.controller";

export const router = express.Router();

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
