import express from "express";
import { createSkills } from "../controllers/skills.controller";

const router = express.Router();

router.post("/create-skills", createSkills);

module.exports =  router;
