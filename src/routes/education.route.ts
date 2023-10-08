import express from "express";
import {
  createEducationDetailController,
  fetchEducationSection,
} from "../controllers/education.controller";

const router = express.Router();

router.get("/education/:id", fetchEducationSection);

router.post("/education/", createEducationDetailController);

module.exports = router;
