// this is an example file
import express from "express";
import multer from "multer";
import { uploadProfileImageController } from "../controllers";

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 1);

const router = express.Router();

/**
 * @swagger
 * /profile/image/upload:
 *   post:
 *     summary: Upload a profile image
 *     description: Upload a user's profile image using a POST request.
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
 *     tags:
 *       - Profile
 *     multipart: true
 */
router.post("/profile/image/upload", uploads, uploadProfileImageController);

module.exports = router;
