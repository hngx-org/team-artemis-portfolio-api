import express from "express";
const router = express.Router();

import {
  createShopSection,
  getUserShopSection
} from "../controllers/shops.controller";

/**
 * @swagger
 * /api/v1/sections/{slug}/shops:
 *   post:
 *     summary: Create a new shop section for a user.
 *     description: Create a new shop section for a user by providing the user's ID.
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: The ID of the user for whom to create an shop.
 *         required: true
 *         type: string
 *       - in: body
 *         name: createshop
 *         description: shop data to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             bio:
 *               type: string
 *             section_id:
 *               type: integer
 *         example:
 *           bio: "New shop section"
 *           section_id: 54
 *     responses:
 *       '201':
 *         description: shop section successfully created.
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
 *                 shop:
 *                   type: object
 *             example:
 *               message: "shop section created successfully"
 *               status: "Success"
 *               statusCode: 201
 *               shop:
 *                 bio: "New shop section"
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
 *       - shop
 */


router.post("/sections/:user_slug/shops", createShopSection);

/**
 * @swagger
 * /api/v1/sections/{slug}/shops:
 *   get:
 *     summary: get a shop section for a user.
 *     description: get shop section for a user by providing the user's ID.
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: The ID of the user for whom to create an shop.
 *         required: true
 *         type: string
 *       - in: body
 *         name: createshop
 *         description: shop data to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             bio:
 *               type: string
 *             section_id:
 *               type: integer
 *         example:
 *           bio: "New shop section"
 *           section_id: 54
 *     responses:
 *       '201':
 *         description: shop section successfully created.
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
 *                 shop:
 *                   type: object
 *             example:
 *               message: "shop section created successfully"
 *               status: "Success"
 *               statusCode: 201
 *               shop:
 *                 bio: "New shop section"
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
 *       - shop
 */


router.get("/sections/:user_slug/shops", getUserShopSection);

module.exports = router;

