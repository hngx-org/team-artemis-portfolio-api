import express, { Router } from "express";
import { deleteEducationDetail } from "../controllers/deleteEducation.controllers";
const router: Router = express.Router();
/**
 * @swagger
 * /deleteEducationDetail/{id}:
 *   put:
 *     summary: Delete education detail by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the education detail to delete.
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         description: education detail deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     
 *       404:
 *         description: Education detail not found
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

router.delete('/education/:id', deleteEducationDetail);

module.exports = router;