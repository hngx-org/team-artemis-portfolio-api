import express from "express";
import { createReference, deleteReferenceDetail } from "../controllers/reference.controller"; 
import { validateCreateReferenceData } from "../middlewares/reference.zod"; 

const router = express.Router();

// Create a reference
router.post("/references", validateCreateReferenceData, createReference);

// Delete a reference by ID
router.delete("/references/:id", deleteReferenceDetail);

module.exports = router;
