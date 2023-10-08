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

router.post("/", validateSchema(customUserSectionSchema), create);
router.get("/", findAll);
router.post("/:id", findOne);
router.post("/", validateSchema(customFieldSchema), createCustomField);
router.get("/", findAllCustomField);
router.post("/:id", findOneCustomField);
// don't forget to add the route that fetches all the custom field in in a customUserSectionSchema
module.exports = router;
