import express, { Request, Response } from 'express';
import ProjectController from '../controllers/deleteProject.controller'; // Import your project controller

const router = express.Router();

/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: Delete Project Section API
 *   description: API for deleting a project section
 *   version: '1.0'
 * basePath: /api
 * schemes:
 *   - http
 *   - https

 * paths:
 *   /projects/delete/{id}:
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
 *           description: deleted project info
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

 */
// Define the route for deleting a project section
router.delete('/projects/delete/:id', ProjectController.deleteProjectSection);

module.exports = router;
