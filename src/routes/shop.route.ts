import express from "express";
import { fetchShop } from "../controllers/shop.controller";

const router = express.Router();

/**
 * @swagger
 * /api/get-shop/{userId}:
 *   get:
 *     summary: Get all product images created by a user
 *     description: Get all product images created by a user by passing the Id of the user
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.get("/get-shop/:id", fetchShop);

module.exports = router;
