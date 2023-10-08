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

/**
 * @swagger
 * /custom:
 *   post:
 *     summary: Add custom section
 *     description: Add a custom section for auser
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: json
 *         userId: string
 *         sectionId: number
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad request. Please fill all fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *     tags:
 *       - custom
 */
router.post("/custom", create);
/**
 * @swagger
 * /custom:
 *   get:
 *     summary: Get all Custom records for  user
 *     description: Get custom fields
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *     tags:
 *       - custom
 */
router.get("/custom", findAll);
/**
 * @swagger
 * /custom/:id:
 *   get:
 *     summary: Get single custom record
 *     description: Get single custom field
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *     tags:
 *       - custom
 */
router.get("/custom/:id", findOne);
/**
 * @swagger
 * /custom/field:
 *   post:
 *     summary: Add custom field section
 *     description: Add a custom field in a section using the id
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: json
 *         fieldType: string
 *         customSectionId: number
 *         value: string
 *         fieldName: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad request. Please fill all fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *     tags:
 *       - custom
 */
router.post("/custom/field", createCustomField);
// router.get("/custom/field", findAllCustomField);

/**
 * @swagger
 * /custom/field:id:
 *   get:
 *     summary: Get single custom field record
 *     description: Get single custom field
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *     tags:
 *       - custom
 */
router.get("/custom/field/:id", findOneCustomField);
module.exports = router;
