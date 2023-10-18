import express, { Response, Request, NextFunction } from "express";
import multer from "multer";
import { error } from "../utils/response.util";
import { ForbiddenError } from "../middlewares/index";

const router = express.Router();
const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 10);
const uploadHandler = (req: Request, res: Response, next: NextFunction) => {
  uploads(req, res, function (err) {
    if (err) {
      const newForbbidenError = new ForbiddenError(
        "You can only upload a maximum of 10 images"
      );
      next(newForbbidenError);
    }
    next();
  });
};

import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectController,
  getAllProjectsForUser,
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
 *         example: |
 *           {
 *             "title": "My Project",
 *             "year": 2023,
 *             "url": "https://example.com",
 *             "tags": ["Tag1", "Tag2"],
 *             "description": "Project Description",
 *             "userId": "user123",
 *             "sectionId": 1
 *           }
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
router.post("/projects", uploadHandler, createProject);

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

router.delete("/projects/:id", deleteProjectController);

/**
 * @swagger
 * /api/update-project/{project_id}:
 *   put:
 *     summary: Update a project
 *     description: Update an existing project with images and project details.
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: The ID of the project to update.
 *         schema:
 *           type: string
 *       - name: title
 *         in: formData
 *         type: string
 *         description: The title of the project.
 *         required: true
 *         example: "New Project Title"
 *       - name: year
 *         in: formData
 *         type: integer
 *         format: int32
 *         required: true
 *         description: The year of the project.
 *         example: 2024
 *       - name: url
 *         in: formData
 *         type: string
 *         description: Url associated with the project.
 *         example: example.com
 *       - name: tags
 *         in: formData
 *         type: string
 *         description: Comma separated tags associated with the project.
 *         example: tag1,tag2,tag3
 *       - name: description
 *         in: formData
 *         type: string
 *         description: A description of the project.
 *         example: "This is a new project description"
 *       - name: thumbnail
 *         in: formData
 *         type: integer
 *         description: The thumbnail associated with the project
 *         example: 0
 *       - name: userId
 *         in: formData
 *         type: string
 *         format: uuid
 *         description: The user ID associated with the project.
 *         required: true
 *         example: "ddc5eec2-65be-11ee-8c99-0242ac120002"
 *       - name: sectionId
 *         in: formData
 *         type: integer
 *         format: int32
 *         description: The section ID associated with the project.
 *         example: 4
 *       - name: images
 *         in: formData
 *         type: file
 *         description: Images for the project, including the thumbnail. You can upload multiple images.
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
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

router.put("/projects/:project_id", uploadHandler, updateProjectById);


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

router.get("/users/:user_id/projects", getAllProjectsForUser);

module.exports = router;