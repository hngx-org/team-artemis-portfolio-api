import express, { Router } from "express";
import {
  updateContactController,
  deleteContactController,
} from "../controllers";
const router = express.Router();

router.patch("/contact/:Id", updateContactController);
router.delete("/contact/:Id", deleteContactController);

module.exports = router;
