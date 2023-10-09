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
 * /api/update-project/{project_id}:
 *   put:
 *     summary: Update a project
 *     description: D an existing project with images and project details.
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: The ID of the project to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Images for the project, including the thumbnail. You can upload multiple images.
 *               jsondata:
 *                 type: string
 *                 format: binary
 *                 description: JSON data containing project details.
 *                 example: |
 *                   {
 *                     "title": "Updated Project",
 *                     "year": 2023,
 *                     "url": "https://updated-example.com",
 *                     "tags": "tag1, tag2, tag3",
 *                     "description": "This is an updated project"
 *                   }
 *     responses:
 *       '200':
 *         description: Successfully updated the project
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

router.put("/update-project/:project_id", uploads, updateProjectById);

module.exports = router;
