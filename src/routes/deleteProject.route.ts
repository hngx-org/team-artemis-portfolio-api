import express from "express";
import ProjectController from "../controllers/deleteProject.controller";

const router = express.Router();

/**
 * @swagger
 *   /api/projects/delete/{id}:
 *     delete:
 *       summary: Delete a Project Section
 *       description: Deletes a project section by ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the project section to delete
 *           required: true
 *           type: integer
 *       responses:
 *         204:
 *           description: Deleted project info
 *         404:
 *           description: Project not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *         500:
 *           description: Internal server error
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     tags:
 *       - Project
 */
// Define the route for deleting a project section
router.delete("/projects/delete/:id", ProjectController.deleteProjectSection);

module.exports = router;
