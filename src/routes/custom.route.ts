import express from "express";
import {
  create,
  findAll,
  findOne,
  createCustomField,
  findOneCustomField,
  deleteCustomSection,
} from "../controllers/custom.controller";

const router = express.Router();

/**
 * @swagger
 * /custom:
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
 * /custom/{id}:
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
 * /custom/field:
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
 * /custom/field/{id}:
 *   get:
 *     summary: Get single custom field record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the custom field detail to get
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


/**
 * @swagger
 * /api/custom-section/{id}:
 *   delete:
 *     summary: Delete a custom section by ID
 *     description: Delete a custom section by providing its ID.
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the custom section to delete.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Custom Section deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Custom Section deleted successfully"
 *       404:
 *         description: Custom Section not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Custom Section not found"
 *                 data:
 *                   type: null
 *       500:
 *         description: Error deleting Custom Section.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error deleting Custom Section"
 *                 data:
 *                   type: null
 */
router.delete("/custom-section/:id", deleteCustomSection)

module.exports = router;
