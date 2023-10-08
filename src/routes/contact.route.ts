import { Router } from "express";
import {
  updateContactController,
  deleteContactController,
} from "../controllers";
const router = Router();

router.patch("/contact/:Id", updateContactController);
router.delete("/contact/:Id", deleteContactController);

export default router;
