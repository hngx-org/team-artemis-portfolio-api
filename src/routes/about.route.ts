import express from "express";
const router = express.Router();

import { createOrUpdateAbout, getAboutByUserID } from "../controllers/about.controller";


router.put("/about/:userId", createOrUpdateAbout);
router.get("/about/:user_id", getAboutByUserID);

module.exports = router;