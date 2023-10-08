import express from "express";
<<<<<<< HEAD
import {
  createEducationDetailController,
  fetchEducationSection,
} from "../controllers/education.controller";

const router = express.Router();

router.get("/education/", fetchEducationSection);

router.post("/education/", createEducationDetailController);

=======
import { createEducationDetailController } from "../controllers/education.controller";

const router = express.Router();

router.post("/education/", createEducationDetailController);

>>>>>>> c66f06ca7914cfb8dc983314654d5b7cfcd591f5
module.exports = router;
