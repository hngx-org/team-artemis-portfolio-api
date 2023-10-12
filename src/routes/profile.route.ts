import express from "express";
import multer from "multer";
import {
  coverphoto,
  createProfileController,
  deletePortfolioDetails,
  updatePortfolioDetails,
  uploadProfileImageController,
  getAllUsers,
  getUserById,
  uploadImageController,
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
 * /api/profile/{userId}:
 *   post:
 *     summary: Create Portfolio profile
 *     description: Create a portfolio.
 *     tags: [User Portfolio Details]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user.
 *         type: uuid
 *       - in: body
 *         name: createPortfolioDetails
 *         description: New portfolio detail
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             city:
 *               type: string
 *             country:
 *               type: string
 *             trackId:
 *               type: string
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

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
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
router.get("/users", getAllUsers);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get user details by ID
 *     description: Retrieve a user's portfolio details by providing their ID.
 *     tags: [User Portfolio Details]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose portfolio details are to be retrieved.
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
 *         description: Requested user not found
 */
router.get("/users/:userId", getUserById);

/**
 * @swagger
 * /api/profile/{userId}:
 *   post:
 *     summary: Create Portfolio profile
 *     description: Create a portfolio.
 *     tags: [User Portfolio Details]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user.
 *         type: uuid
 *       - in: body
 *         name: createPortfolioDetails
 *         description: New portfolio detail
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             city:
 *               type: string
 *             country:
 *               type: string
 *             trackId:
 *               type: string
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

module.exports = router;
