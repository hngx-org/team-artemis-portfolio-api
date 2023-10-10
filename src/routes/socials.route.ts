import express from "express";
import { createSocials } from "../controllers/socials.controller";

const router = express.Router();

router.post('/socials', createSocials)
module.exports = router;