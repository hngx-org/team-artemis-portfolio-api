import express from "express";
import multer from "multer";
import {
  createProfileController,
  deletePortfolioDetails,
  updatePortfolioDetails,
  uploadProfileImageController,
} from "../controllers";

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 1);

const router = express.Router();

/**
 * @swagger
 * /api/profile/image/upload:
 *   post:
 *     summary: Upload a profile image
 *     description: Upload a user's profile image using a POST request.
 *     tags: [Profile]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: The profile image to upload (one file allowed).
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad request. The uploaded file may not be valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *     multipart: true
 */
router.post("/profile/image/upload", uploads, uploadProfileImageController);

/**
* @swagger
paths:
* api/profile-details/{Id}:
*    put:
*      summary: Updates the profile details .
*      tags:
*        - Profile
*      parameters:
*        - name: Id
*          in: path
*          required: true
*          schema:
*            type: integer
*      requestBody:
*        description: New profile detail data
*        required: true
*        content:
*           application/json:
*            schema:
*              type: object
*              required:
*                - name
*                - trackId
*                - city
*                - country
*              properties:
*                name:
*                  type: string
*                trackId:
*                  type: integer
*                city:
*                  type: string
*                country:
*                  type: string
*      responses:
*        '200':
*          description: Successful response
*          content:
*            application/json:
**              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*        '400':
*          description: Bad request
*          content:
*            application/json:
*              schema:
 *               type: object
*                properties:
*                error:
*                   type: string
*
 */
router.put("/profile-details/:id", updatePortfolioDetails);

/**
 * @swagger
 * /api/profile/{userId}:
 *   post:
 *     summary: Create Portfolio profile
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The id of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New profile detail data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - trackId
 *               - city
 *               - country
 *             properties:
 *               name:
 *                 type: string
 *               trackId:
 *                 type: number
 *               city:
 *                 type: string
 *               country:
 *                 type: string
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
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/profile/:userId", createProfileController);

/**
 * @swagger
 * /api/profile-details/{id}:
 *   delete:
 *     summary: Delete a Portfolio Profile details
 *     description: Delete a user's Portfolio Profile details by providing its ID.
 *     tags: [Portfolio]
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
