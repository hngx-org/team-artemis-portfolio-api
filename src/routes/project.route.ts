import express, { Request, Response } from 'express';
import ProjectController from '../controllers/project.controller'; // Import your project controller

const router = express.Router();

// Define the route for deleting a project section
router.delete('/projects/:id', ProjectController.deleteProjectSection);

export default router;
