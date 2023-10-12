import express from "express";
import multer from "multer";
import {
  coverphoto,
  createProfileController,
  deletePortfolioDetails,
  updatePortfolioDetails,
  uploadProfileImageController,
} from "../controllers";
import {
  createPorfolioDataSchema,
  validateCreatePortfolioDetails,
} from "../middlewares/profile.zod";

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 1);

const router = express.Router();

/**
 * @swagger
 * /api/profile/image-upload:
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
router.post("/profile/image-upload", uploads, uploadProfileImageController);

/**
 * @swagger
 * /api/profile-details/{id}:
 *   put:
 *     summary: Update portfolio details by ID
 *     description: Update a user's portfolio details by providing its ID.
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the portfolio details to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated portfolio detail data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: number
 *     responses:
 *       200:
 *         description: Portfolio details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Portfolio details not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: validateCreatePortfolioDetails
 *                 error:
 *                   type: string
 */
router.put("/profile-details/:id", updatePortfolioDetails);

/**
 * @swagger
 * /api/profile/{userId}:
 *   post:
 *     summary: Create Portfolio profile
 *     description: Create a portfolio.
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The id of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *                 required: false
 *               city:
 *                 type: string
 *                 description: The user's city.
 *                 example: Lagos
 *               country:
 *                 type: string
 *                 description: The user's country.
 *                 example: Nigeria
 *               trackId:
 *                 type: string
 *                 description: The user's selected track.
 *                 example: 1
 *                 required: false
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
router.post(
  "/profile/:userId",
  validateCreatePortfolioDetails(createPorfolioDataSchema),
  createProfileController
);

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

/**
 * @swagger
 * /api/cover/photo:
 *   post:
 *     summary: Upload cover photos
 *     description: Upload multiple cover photos using a POST request.
 *     tags: [Upload]
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: The cover photos to upload (up to 10 files).
 *     responses:
 *       200:
 *         description: Cover photos uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad request. One or more files may not be valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 */
router.post("/profile/cover-photo", uploads, coverphoto);

module.exports = router;
