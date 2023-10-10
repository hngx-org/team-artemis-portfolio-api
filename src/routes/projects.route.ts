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
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects.
 *     responses:
 *       '200':
 *         description: Successfully retrieved a list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *     tags:
 *       - Project
 */
router.get("/projects", getAllProjects);
/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     description: Retrieve a project by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *     tags:
 *       - Project
 */

router.get("/projects/:id", getProjectById);
/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project with images and project details.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: The images to upload (up to 10 files).
 *       - in: formData
 *         name: jsondata
 *         type: string
 *         description: JSON data containing project details.
 *     responses:
 *       '201':
 *         description: Successfully created a new project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad request. Check the request format.
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

router.post("/projects", uploads, createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project by ID
 *     description: Delete a project by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Project deleted successfully
 *       '404':
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

router.delete("/projects/:id", deleteProjectById);

/**
 * @swagger
 * /update-project/{project_id}:
 *   put:
 *     summary: Update a project by ID.
 *     description: Update a project with the specified ID using the provided data and images.
 *     tags:
 *       - Project
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project to update.
 *       - in: body
 *         name: data
 *         required: true
 *         description: The data to update the project.
 *         schema:
 *           type: object
 *           properties:
 *             // Define your data properties here
 *       - in: formData
 *         name: images
 *         required: true
 *         type: array
 *         items:
 *           type: file
 *         description: Images to upload (max 10).
 *     responses:
 *       200:
 *         description: Project updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               // Define your response schema here
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */

router.put("/update-project/:project_id", uploads, updateProjectById);

module.exports = router;
