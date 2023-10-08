// this is an example file
import express from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 10);

import { uploadImageController } from "../controllers";
import { coverphoto } from "../controllers/cover-photo";

const router = express.Router();

/**
 * @swagger
 * /upload:
 *   get:
 *     summary: Upload images
 *     description: Upload multiple images using a GET request.
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: The images to upload (up to 10 files).
 *     responses:
 *       200:
 *         description: Images uploaded successfully.
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
 *     tags:
 *       - Upload
 */
router.get("/upload", uploads, uploadImageController);
/**
 * @swagger
 * /cover/photo:
 *   get:
 *     summary: Upload images
 *     description: Upload multiple images using a GET request.
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: The images to upload (up to 10 files).
 *     responses:
 *       200:
 *         description: Images uploaded successfully.
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
 *     tags:
 *       - Upload
 */
router.post("/cover/photo", uploads, coverphoto);

module.exports = router;
