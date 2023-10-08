import express from "express";
import { deleteWorkExperience } from "../controllers/work-experience.controller";

export const router = express.Router();

router.delete("/work-experience/:id", deleteWorkExperience);

module.exports = router;
