import express from "express";
import { createSkills, getSkillsDetails } from "../controllers/skills.controller";

const router = express.Router();

router.post("/create-skills", createSkills);
router.get("/skills-details", getSkillsDetails);

module.exports =  router;
