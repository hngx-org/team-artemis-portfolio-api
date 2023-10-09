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
 *   post:
 *     summary: Create a new project
 *     description: Create a new project with images and project details.
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
 *                     "title": "New Project",
 *                     "year": 2023,
 *                     "url": "https://example.com",
 *                     "tags": "tag1, tag2, tag3",
 *                     "description": "This is a new project",
 *                     "userId": "ddc5eec2-65be-11ee-8c99-0242ac120002"
 *                   }
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

router.get("/projects", getAllProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project with images and project details.
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
 *                     "title": "New Project",
 *                     "year": 2023,
 *                     "url": "https://example.com",
 *                     "tags": "tag1, tag2, tag3",
 *                     "description": "This is a new project",
 *                     "userId": "ddc5eec2-65be-11ee-8c99-0242ac120002"
 *                   }
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
router.get("/projects/:id", getProjectById);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project with images and project details.
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
 *                     "title": "New Project",
 *                     "year": 2023,
 *                     "url": "https://example.com",
 *                     "tags": "tag1, tag2, tag3",
 *                     "description": "This is a new project",
 *                     "userId": "ddc5eec2-65be-11ee-8c99-0242ac120002"
 *                   }
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
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project with images and project details.
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
 *                     "title": "New Project",
 *                     "year": 2023,
 *                     "url": "https://example.com",
 *                     "tags": "tag1, tag2, tag3",
 *                     "description": "This is a new project",
 *                     "userId": "ddc5eec2-65be-11ee-8c99-0242ac120002"
 *                   }
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
// router.put("/projects/:id", updateProjectById);
router.delete("/projects/:id", deleteProjectById);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project with images and project details.
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
 *                     "title": "New Project",
 *                     "year": 2023,
 *                     "url": "https://example.com",
 *                     "tags": "tag1, tag2, tag3",
 *                     "description": "This is a new project",
 *                     "userId": "ddc5eec2-65be-11ee-8c99-0242ac120002"
 *                   }
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
// Update Project section (/api/update-project/:project_id)
router.put("/update-project/:project_id", uploads, updateProjectById);

module.exports = router;
