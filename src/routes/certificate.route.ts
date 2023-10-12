import express from "express";
import { createCertificate } from "../controllers/certificate.controller";
import {
  validateCertificate,
  CertificateSchema,
} from "../middlewares/certificate.zod";
const router = express.Router();

router.post("/certificate", validateCertificate, createCertificate);
module.exports = router;
