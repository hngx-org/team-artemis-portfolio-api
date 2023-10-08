import express, { Request, Response, NextFunction } from "express";
import {
  create,
  findAll,
  findOne,
  createCustomField,
  findAllCustomField,
  findOneCustomField,
  validateSchema,
  customUserSectionSchema,
  customFieldSchema,
} from "../controllers/custom.controller";

const router = express.Router();

router.post("/custom", create);
router.get("/custom", findAll);
router.get("/custom/:id", findOne);
router.post("/custom/field", createCustomField);
// router.get("/custom/field", findAllCustomField);
router.get("/custom/field/:id", findOneCustomField);
// don't forget to add the route that fetches all the custom field in in a customUserSectionSchema
module.exports = router;
