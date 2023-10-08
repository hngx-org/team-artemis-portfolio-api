import express from "express";
const router = express.Router();
import multer from "multer";
const storage = multer.memoryStorage();
const uploads = multer({ storage }).array("images", 10);


import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProjectById,
    deleteProjectById,
} from "../controllers/projects.controller";



router.get("/projects", getAllProjects)
router.get("/projects/:id", getProjectById);
router.post("/projects", uploads, createProject);
router.put("/projects/:id", updateProjectById);
router.delete("/projects/:id", deleteProjectById);

module.exports = router;
