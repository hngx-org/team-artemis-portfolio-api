import express from "express";
import multer from "multer";
import {
  updateProfileController,
  getAllUsers,
  getUserById,
  uploadImageController,
  uploadProfileCoverController,
  uploadProfileImageController,
  deleteAllSectionEntries
} from "../controllers";
import {
  createPorfolioDataSchema,
  validateCreatePortfolioDetails,
} from "../middlewares/profile.zod";
import { ForbiddenError } from "../middlewares";
import { NextFunction, Request, Response } from "express";


const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 1);
const uploadHandler = (req: Request, res: Response, next: NextFunction) => {
  uploads(req, res, function (err) {
    if (err) {
      const newForbbidenError = new ForbiddenError("You can only upload a maximum of 10 images");
      next(newForbbidenError);
    }
    next();
  })
}


const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
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
 * /api/v1/users/{userId}:
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
 * /api/v1/profile/{userId}:
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
router.put(
  "/users/:userId",
  updateProfileController
);

/**
 * @swagger
 * /api/v1/profile/cover/upload:
 *   post:
 *     summary: Upload user cover photo
 *     description: Upload multiple cover photos using a POST request.
 *     tags: [User Portfolio Details]
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
 *     multipart: true
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
router.post("/profile/cover/upload", uploadHandler, uploadProfileCoverController);

/**
 * @swagger
 * /api/v1/profile/image/upload:
 *   post:
 *     summary: Upload a profile image
 *     description: Upload a user's profile image using a POST request.
 *     tags: [User Portfolio Details]
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
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
router.post("/profile/image/upload", uploadHandler, uploadProfileImageController);



/**
 * @swagger
 * /api/v1/update/details/{userId}:
 *   delete:
 *     summary: Delete a user section
 *     description: Delete all entries of a particular section for a user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose section is to be deleted.
 *         type: uuid
 *         example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *       - in: body
 *         name: body
 *         required: true
 *         description: Body of request takes a section name
 *         schema:
 *           type: object
 *           properties:
 *             section:
 *               type: string
 *               example: "about"
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *     tags:
 *       - Settings
 */

router.delete("/profile/details/:userId", deleteAllSectionEntries);

module.exports = router;
