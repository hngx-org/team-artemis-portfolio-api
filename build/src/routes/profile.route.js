"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// this is an example file
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var controllers_1 = require("../controllers");
var storage = multer_1.default.memoryStorage();
var uploads = (0, multer_1.default)({ storage: storage }).array("images", 1);
var router = express_1.default.Router();
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
router.post("/profile/image/upload", uploads, controllers_1.uploadProfileImageController);
module.exports = router;
//# sourceMappingURL=profile.route.js.map