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
 * /api/award/{id}:
 *   get:
 *     summary: Fetch user award by ID.
 *     description: Fetch the award of a user.
 *     tags:
 *       - Awards
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the user whose awards are to be fetched.
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Award retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: "Award retrieved successfully"
 *                 award:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     title: 
 *                       type: string
 *                     year:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     presented_by:
 *                       type: string
 *                     url:
 *                       type: string
 *                     description:
 *                       type: string
 *                     createdAt:
 *                       type: string                  
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."                
 *       404:
 *         description: Award not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Award not found."           
 */

router.get("/award/:id", getAwardController);

/**
 * @swagger
 * /api/awards:
 *   get:
 *     summary: Fetch all user award.
 *     description: Fetch the award of all user.
 *     tags:
 *       - Awards
 *     responses:
 *       200:
 *         description: Award retrieved successfully.
 *         content:
 *           application/json:           
 *              properties:
 *                 message: 
 *                   type: string
 *                   example: "All awards retrieved successfully"
 *                 award:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     title: 
 *                       type: string
 *                     year:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     presented_by:
 *                       type: string
 *                     url:
 *                       type: string
 *                     description:
 *                       type: string
 *                     createdAt:
 *                       type: string                
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."                               
 */
router.get("/awards", getAllAwardsController);

/**
 * @swagger
 * /api/award/{id}:
 *   delete:
 *     summary: Delete an award by ID.
 *     description: Delete an award by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Award deleted successfully. Returns the deleted award.
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
 *                     id:
 *                       type: number
 *                     title:
 *                       type: string
 *                     year:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     presented_by:
 *                       type: string
 *                     url:
 *                       type: string
 *                     description:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *           example:
 *             message: "Award deleted successfully"
 *             award:
 *               id: 3
 *               title: "string"
 *               year: "string"
 *               user_id: "f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90"
 *               presented_by: "string"
 *               url: "string"
 *               description: "dev of the month award"
 *               createdAt: "2023-10-11T23:08:19.159Z"
 *       404:
 *         description: Award not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Award not found."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."  
 *     tags:
 *       - Awards
 */


router.delete("/award/:id", deleteAwardController);

module.exports = router;
