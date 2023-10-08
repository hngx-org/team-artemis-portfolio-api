import express from 'express';
import { updateCustomSection } from '../controllers/custom-section.controller'

const router = express.Router();


router.put('/customsections/:sectionId', updateCustomSection);

export default router;
