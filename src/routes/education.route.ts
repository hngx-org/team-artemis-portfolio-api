import express from "express";
import {
  createEducationDetailController,
  fetchEducationSection,
} from "../controllers/education.controller";

const router = express.Router();

router.get("/education/", fetchEducationSection);

router.post("/education/", createEducationDetailController);

module.exports = router;
