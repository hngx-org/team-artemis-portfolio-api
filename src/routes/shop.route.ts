import express from "express";
const router = express.Router();

import {
  createShopSection,
  getUserShopSection
} from "../controllers/shops.controller";

/**
 * @swagger
 * /api/v1/sections/{userId}/shops:
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

router.post("/sections/:user_slug/shops", createShopSection);

router.get("/sections/:user_slug/shops", getUserShopSection);

module.exports = router;

