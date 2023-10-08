import express from 'express';
import  updateCustomSection  from '../controllers/updatesection'

const router = express.Router();


router.put('/customsections/:sectionId', updateCustomSection);

export default router;
