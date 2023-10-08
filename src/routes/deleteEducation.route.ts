import express, { Router } from "express";
import { deleteEducationDetail, createEducationDetail } from "../controllers/deleteEducation.controllers";


const router: Router = express.Router();

router.post('/education', createEducationDetail);
router.delete('/education/:id', deleteEducationDetail);

module.exports = router;