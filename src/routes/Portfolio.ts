import { getAllUsers, getUserById } from "../controllers/Portfolio"
import { Router } from "express";

const router = Router();   // Create a new router

router.get("/portfolio", getAllUsers);
router.get("/portfolio/:id", getUserById);