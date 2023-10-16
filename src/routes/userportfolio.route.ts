import {
  // getAllPortfolioDetails,
  getPortfolioDetails,
  updatePortfolioDetails,
  deletePortfolioDetails,
} from "../controllers/userportfolio.controller";
import { Router } from "express";
import {
  updatePortfolioDataSchema,
  validateUpdatePortfolioDetails,
} from "../middlewares/profile.zod";

const router = Router();

/**
 * @swagger
 * /api/getPortfolioDetails/{userId}:
 *   get:
 *     summary: Get all portfolio details including sections
 *     description: Get request to retrieve all portfolio details for a user.
 *     tags: [User Portfolio Details]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The userId of the user requesting portfolio details.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 data:
 *                   type: object
 *                   description: Portfolio details.
 *                 successful:
 *                   type: boolean
 *                   description: true
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *                 successful:
 *                   type: boolean
 *                   description: false
 *                 data:
 *                   type: string
 *                   description: null
 */
router.get("/getPortfolioDetails/:userId", getPortfolioDetails);

/**
 * @swagger
 * /api/portfolioDetails:
 *   get:
 *     summary: Get all portfolio details
 *     description: Retrieve a list of all users' portfolio details.
 *     tags: [User Portfolio Details]
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
 */
// router.get("/portfolioDetails", getAllPortfolioDetails);

/**
 * @swagger
 * /api/update-profile-details/{userId}:
 *   put:
 *     summary: Update User's Profile Portfolio Details
 *     description: Update a user's portfolio details by providing its ID and the required data in json format in the body of the request.
 *     tags: [User Portfolio Details]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The ID of the user to update.
 *         required: true
 *         type: string
 *         example: 6ba7b810-9dad-11d1-80b4-00c04fd430c8
 *       - in: body
 *         name: updateUserProfileDetails
 *         description: Data to update user's profile.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               required: true
 *             trackId:
 *               type: number
 *               required: true
 *             city:
 *               type: string
 *             country:
 *               type: string
 *           example:
 *               name: "Joe King"
 *               trackId: 2
 *               city: "Lome"
 *               country: "Togo"
 *     responses:
 *       '200':
 *         description: Successful response
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
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to update Work Experience"
 *                 data:
 *                   type: null
 */

router.put("/update-profile-details/:userId", validateUpdatePortfolioDetails(updatePortfolioDataSchema), updatePortfolioDetails);

/**
 * @swagger
 * /api/profile-details/{id}:
 *   delete:
 *     summary: Delete a Portfolio Profile details
 *     description: Delete a user's Portfolio Profile details by providing its ID.
 *     tags: [User Portfolio Details]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of Portfolio to delete.
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
router.delete("/profile-details/:id", deletePortfolioDetails);

module.exports = router;
