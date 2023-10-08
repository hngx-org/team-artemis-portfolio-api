import express from "express";
import multer from "multer";
import { updateProjectController } from "../controllers/project.controller";

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 10);

const router = express.Router();

/**
 * @swagger
 * /updat-project/project_id:
 *   put:
 *     summary: Update project detail by ID using PUT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project detail to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New project detail data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: number
 *     responses:
 *       200:
 *         description: Project updated successfully
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
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *     tags:
 *       - Project
 */


// Update Project section (/api/update-project/:project_id)
router.put("/update-project/:project_id", uploads, updateProjectController);

module.exports = router;