import express from "express";
import { createEducationDetailController } from "../controllers/education.controller";

const router = express.Router();

router.post("/education/", createEducationDetailController);

module.exports = router;
