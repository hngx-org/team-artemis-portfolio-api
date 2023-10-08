import express from "express";
import multer from "multer";
import { updateProjectController } from "../controllers/project.controller";


const router = express.Router();

// Update Project section (/api/update-project/:project_id)
router.put("/update-project/:project_id", updateProjectController);

module.exports = router;