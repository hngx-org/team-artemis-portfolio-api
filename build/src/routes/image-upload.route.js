"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// this is an example file
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.memoryStorage();
var uploads = (0, multer_1.default)({ storage: storage }).array("images", 10);
var controllers_1 = require("../controllers");
var cover_photo_1 = require("../controllers/cover-photo");
var router = express_1.default.Router();
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
router.get("/upload", uploads, controllers_1.uploadImageController);
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
router.post("/cover/photo", uploads, cover_photo_1.coverphoto);
module.exports = router;
//# sourceMappingURL=image-upload.route.js.map