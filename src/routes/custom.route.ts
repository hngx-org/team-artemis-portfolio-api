import express from "express";
import {
  create,
  findAll,
  findOne,
  createCustomField,
  findOneCustomField,
} from "../controllers/custom.controller";

const router = express.Router();

/**
 * @swagger
 * /api/custom:
 *   post:
 *     summary: Add custom section
 *     description: Add a custom section for a user
 *     parameters:
 *       - in: formData
 *         name: userId
 *         type: string
 *         description: must be a uuid
 *       - in: formData
 *         name: sectionId
 *         type:  number
 *         description: must be a number
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
 * /api/custom:
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
 * /api/custom/{id}:
 *   get:
 *     summary: Get single custom record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the custom filed detail to get
 *         schema:
 *           type: string
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
 * /api/custom/field:
 *   post:
 *     summary: Add custom field section
 *     description: Add a custom field in a section usin
 *     parameters:
 *       - in: formData
 *         name: fieldType
 *         type: string
 *         description: must be a string
 *       - in: formData
 *         name: customSectionId
 *         type:  number
 *         description: must be a number
 *       - in: formData
 *         name: fieldName
 *         type:  string
 *         description: must be a string
 *       - in: formData
 *         name: value
 *         type:  string
 *         description: must be a string
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

/**
 * @swagger
 * /api/custom/field/{id}:
 *   get:
 *     summary: Get single custom field record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the custom filed detail to get
 *         schema:
 *           type: string
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
