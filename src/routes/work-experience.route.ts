import express from "express";
import { createWorkExperience } from "../controllers/work-experience.controller";


const router = express.Router();

router.post("/create-work-experience", createWorkExperience);

module.exports =  router;
