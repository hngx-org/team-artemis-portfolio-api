import express from "express";
const router = express.Router();

import {
  createAbout,
  updateAbout,
  getAboutByID,
  deleteAbout,
} from "../controllers/about.controller";

router.post("/about/:userId", createAbout);
router.put("/about/:id", updateAbout);
router.get("/about/:id", getAboutByID);
router.delete("/about/:id", deleteAbout);

module.exports = router;
