import express from "express";
import multer from "multer";
import { uploadImageController } from "../controllers";

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 10);

const router = express.Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload images
 *     description: Upload multiple images using a POST request.
 *     tags: [Upload]
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
 */
router.post("/images/upload", uploads, uploadImageController);


module.exports = router;
