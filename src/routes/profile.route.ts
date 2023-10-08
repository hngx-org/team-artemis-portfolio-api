// this is an example file
import express from "express";
import multer from "multer";
import { uploadProfileImageController } from "../controllers";

const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 1);

const router = express.Router();

router.post("/image/upload", uploads, uploadProfileImageController);

export default router;
