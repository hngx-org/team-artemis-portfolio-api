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

router.post("/award/:userId", validateCreateAwardData, createAwardController);

/**
 * @swagger
 * /api/update-award/{awardId}:
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
 *       - Awards
 */
router.put("/award/:awardId", updateAwardController);

/**
 * @swagger
 * /api/award/:id:
 *   get:
 *     summary: Get award detail(s) for a user who's id is in the params and returns an array of objects containing a user award details.
 *     description: Get award detail(s) for a user who's id is in the params and returns an array of objects containing a user award details.
 *     tags: [Award]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         description: Optional authorization header
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               year:
 *                 type: string
 *               presented_by:
 *                 type: string
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *               createdAt:
 *                 type: Date
 *               user:
 *                 type: user
 *               section:
 *                  type: section
 *
 *     responses:
 *       200:
 *         description: Award retrieved successfully.
 *         educationDetails: Array of user awards detail(s).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.get("/award/:id", getAwardController);

/**
 * @swagger
 * /api/awards:
 *   get:
 *     summary: Get the award detail of all users
 *     description: All awards retrieved successfully
 *     responses:
 *       200:
 *         description: Award retrieved successfully.
 *         awardDetails: Array of user award details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
router.get("/awards", getAllAwardsController);

router.delete("/award/:id", deleteAwardController);

module.exports = router;
