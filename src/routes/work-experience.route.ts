import { Router } from "express";
import { deleteWorkExperience } from "../controllers/work-experience.controller";

export const workExperienceRoutes = Router();

workExperienceRoutes.delete("/work-experience/:id", deleteWorkExperience);
