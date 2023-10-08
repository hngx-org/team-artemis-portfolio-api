import express from "express";
import {
  createWorkExperience,
  deleteWorkExperience,
} from "../controllers/work-experience.controller";

const router = express.Router();
router.post("/create-work-experience", createWorkExperience);
router.delete("/work-experience/:id", deleteWorkExperience);

module.exports = router;
