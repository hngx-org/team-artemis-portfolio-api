import express from "express";
const router = express.Router();
import multer from "multer";
const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 10);

import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById,
} from "../controllers/projects.controller";

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project for update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Update details for the project
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: number
 *               url:
 *                  type: string
 *               tags:
 *                   type: string
 *               description:
 *                    type: string
 *               userId:
 *
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
 *       - Education
 */

router.get("/projects", getAllProjects);
router.get("/projects/:id", getProjectById);
router.post("/projects", uploads, createProject);
router.put("/projects/:id", updateProjectById);
router.delete("/projects/:id", deleteProjectById);

module.exports = router;
