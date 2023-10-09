import express, { Router } from "express";
import { updateContactController } from "../controllers";
const router = express.Router();

router.patch("/contact/:Id", updateContactController);

module.exports = router;
