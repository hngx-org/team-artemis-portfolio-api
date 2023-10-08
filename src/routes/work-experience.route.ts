import express from "express";
import {
  createWorkExperience,
  deleteWorkExperience,
  updateWorkExperience,
} from "../controllers/work-experience.controller";

const router = express.Router();
router.post("/create-work-experience", createWorkExperience);
router.delete("/work-experience/:id", deleteWorkExperience);
router.put("/work-experience/:id", updateWorkExperience);

module.exports = router;
