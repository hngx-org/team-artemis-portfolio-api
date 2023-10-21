import express from "express";
const router = express.Router();

import {
  createAbout,
  updateAbout,
  getAboutByID,
  deleteAbout,
} from "../controllers/about.controller";

/**
 * @swagger
 * /api/v1/about/{userId}:
 *   post:
 *     summary: Create a new about details for a user.
 *     description: Create a new about details for a user by providing the user's ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The ID of the user for whom to create an about.
 *         required: true
 *         type: string
 *       - in: body
 *         name: createAbout
 *         description: About data to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             bio:
 *               type: string
 *             section_id:
 *               type: integer
 *         example:
 *           bio: "New About details"
 *           section_id: 54
 *     responses:
 *       '201':
 *         description: About details successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 about:
 *                   type: object
 *             example:
 *               message: "About details created successfully"
 *               status: "Success"
 *               statusCode: 201
 *               about:
 *                 bio: "New About details"
 *                 section_id: 3
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *             example:
 *               'Input Error': "Invalid input data"
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *             example:
 *               'Input Error': "User not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *             example:
 *               'Input Error': "Internal server error"
 *     tags:
 *       - About
 */

router.post("/about/:userId", createAbout);

/**
 * @swagger
 * /api/v1/about/{id}:
 *   put:
 *     summary: Update an existing about details by ID.
 *     description: Update an existing about detail for a user by providing the about ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the about details to update.
 *         required: true
 *         type: integer
 *       - in: body
 *         name: updateAbout
 *         description: Updated about data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             bio:
 *               type: string
 *             section_id:
 *               type: integer
 *         example:
 *           bio: "Updated About details"
 *           section_id: 54
 *     responses:
 *       '200':
 *         description: About details successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 about:
 *                   type: object
 *             example:
 *               message: "About details updated successfully"
 *               status: "Success"
 *               statusCode: 200
 *               about:
 *                 bio: "Updated About details"
 *                 section_id: 3
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *             example:
 *               'Input Error': "Invalid input data"
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *             example:
 *               'Input Error': "About not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *             example:
 *               'Input Error': "Internal server error"
 *     tags:
 *       - About
 */

router.put("/about/:id", updateAbout);

/**
 * @swagger
 * /api/v1/about/{userId}:
 *   get:
 *     summary: Get existing about details by user ID.
 *     description: Get an existing about detail for a user by providing the user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The ID of the user.
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: About details successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 about:
 *                   type: object
 *             example:
 *               message: "About details retrieved successfully"
 *               status: "Success"
 *               statusCode: 200
 *               about:
 *                 bio: "About details"
 *                 section_id: 2
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *             example:
 *               'Input Error': "User not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *             example:
 *               'Input Error': "Internal server error"
 *     tags:
 *       - About
 */

router.get("/about/:userId", getAboutByID);

/**
 * @swagger
 * /api/v1/about/{id}:
 *   delete:
 *     summary: Delete existing about details by ID.
 *     description: Delete an existing about detail for a user by providing the about ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the about details to delete.
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: About details successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *             example:
 *               message: "About details deleted successfully"
 *               status: "Success"
 *               statusCode: 200
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *             example:
 *               'Input Error': "About not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *             example:
 *               'Input Error': "Internal server error"
 *     tags:
 *       - About
 */

router.delete("/about/:id", deleteAbout);

module.exports = router;
