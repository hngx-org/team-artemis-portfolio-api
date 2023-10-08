import express, { Router } from "express";
import { updateEducationDetail } from "../controllers/updateeducation.controller"; // Replace with the actual path to your controller function

const router: Router = express.Router();

// update the education detail
router.put("/api/updateEducationDetail/:id", updateEducationDetail);

export default router;
