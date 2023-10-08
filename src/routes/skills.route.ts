import express from "express";
import {
  createSkills,
  updateSkills,
  deleteSkills,
} from "../controllers/skills.controller";

const router = express.Router();

router.post("/create-skills", createSkills);
router.put("/update-skills/:id", updateSkills);
router.delete("/delete-skills/:id", deleteSkills);
module.exports =  router;
