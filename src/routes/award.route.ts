import express from "express";
import {
  createAwardController,
  getAwardController,
  getAllAwardsController,
  deleteAwardController,
  updateAwardController,
} from "../controllers/award.controller";
import {
  validateCreateAwardData,
  validateUpdateAwardData,
} from "../middlewares/award.zod";

const router = express.Router();

/**
 * @swagger
 * /api/award/{userId}:
 *   post:
 *     summary: Create a new award for a user.
 *     description: Create a new award for a user by providing the user's ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The ID of the user for whom to create an award.
 *         required: true
 *         type: integer
 *       - in: body
 *         name: createAward
 *         description: Award data to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             year:
 *               type: string
 *             presented_by:
 *               type: string
 *             url:
 *               type: string
 *             description:
 *               type: string
 *         example:
 *           title: "New Award Title"
 *           year: "2023"
 *           presented_by: "Company X"
 *           url: "https://example.com"
 *           description: "Award description"
 *     responses:
 *       '201':
 *         description: Successful creation
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
 *                 createdAward:
 *                   type: object
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *     tags:
 *       - Award
 */
router.post("/awards/:userId", validateCreateAwardData, createAwardController);

/**
 * @swagger
 * /api/award/{awardId}:
 *   put:
 *     summary: Update an award by ID.
 *     description: Update an award's information by providing its ID.
 *     parameters:
 *       - in: path
 *         name: awardId
 *         description: The ID of the award to update.
 *         required: true
 *         type: integer
 *       - in: body
 *         name: updateAward
 *         description: Updated award data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             year:
 *               type: string
 *             presented_by:
 *               type: string
 *             url:
 *               type: string
 *             description:
 *               type: string
 *         example:
 *           title: "Updated Award Title"
 *           year: "2024"
 *           presented_by: "Company Y"
 *           url: "https://updated-example.com"
 *           description: "Updated award description"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 award:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     year:
 *                       type: string
 *                     presented_by:
 *                       type: string
 *                     url:
 *                       type: string
 *                     description:
 *                       type: string
 *                 statusCode:
 *                   type: integer
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *     tags:
 *       - Award
 */
router.put("/awards/:awardId", updateAwardController);

/**
 * @swagger
 * /api/award/{id}:
 *   get:
 *     summary: Get award detail(s) for a user who's id is the params and returns an array of objects containing a user award details.
 *     description: Get award detail(s) for a user who's id is in the params and returns an array of objects containing a user award details.
 *     tags: [Award]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         description: Optional authorization header
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user for whom to create education details.
 *     responses:
 *       200:
 *         description: Award retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 award:
 *                   type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 */
router.get("/awards/:id", getAwardController);

/**
 * @swagger
 * /api/awards:
 *   get:
 *     summary: Get the award detail of all users
 *     description: All awards retrieved successfully
 *     responses:
 *       200:
 *         description: Award retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 awards:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *     tags:
 *       - Award
 */
router.get("/awards", getAllAwardsController);

/**
 * @swagger
 * /api/award/{id}:
 *   delete:
 *     summary: Delete an award by ID.
 *     description: Delete an award by providing its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the award to delete.
 *         required: true
 *         type: integer
 *     responses:
 *       '204':
 *         description: Successful deletion
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 'Input Error':
 *                   type: string
 *     tags:
 *       - Award
 */
router.delete("/awards/:id", deleteAwardController);

module.exports = router;
