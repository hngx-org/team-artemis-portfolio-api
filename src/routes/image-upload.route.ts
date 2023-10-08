// this is an example file
import express from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 10);

import { uploadImageController } from "../controllers";

const router = express.Router();

router.get("/upload", uploads, uploadImageController);

module.exports = router;
