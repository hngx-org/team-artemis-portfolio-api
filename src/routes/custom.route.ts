import express from "express";
import {
  create,
  findAll,
  findOne,
  createCustomField,
  updateCustomField,
  findOneCustomField,
  deleteCustomSection,
  createSection,
  validateSchema,
  sectionSchema,
  customUserSectionSchema,
  customFieldSchema,
  fieldsSchema,
} from "../controllers/custom.controller";

const router = express.Router();

/**
 * @swagger
 * /api/section:
 *   post:
 *     summary: Add custom section
 *     description: Add a custom section for a user
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         description: must be a string
 *       - in: formData
 *         name: description
 *         type:  string
 *         description: it's optional
 *       - in: formData
 *         name: meta
 *         type:  string
 *         description: it's optional
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
router.post("/section", validateSchema(sectionSchema), createSection);

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
router.post("/custom", validateSchema(customUserSectionSchema), create);
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
 *     description: Add custom fields in a section using an array
 *     parameters:
 *       - in: formData
 *         name: fields
 *         description: Array of custom fields
 *         required: true
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             fieldType:
 *               type: string
 *               description: Must be a string
 *             customSectionId:
 *               type: number
 *               description: Must be a number
 *             customUserSectionId:
 *               type: number
 *               description: Must be a number
 *             fieldName:
 *               type: string
 *               description: Must be a string
 *             value:
 *               type: string
 *               nullable: true
 *               description: Must be a string (nullable)
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
 *                   description: A success message
 *       400:
 *         description: Bad request. Please fill all fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message
 *     tags:
 *       - custom
 */
router.post("/custom/field", validateSchema(fieldsSchema), createCustomField);

/**
 * @swagger
 * /api/custom/field/{id}:
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
 *     tags:
 *       - custom
 */
router.delete("/custom-section/:id", deleteCustomSection);

/**
 * @swagger
 * /api/custom/field/{id}:
 *   put:
 *     summary: Update a custom field by ID
 *     description: Update a custom field by providing its ID and the new field data.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the custom field to update.
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: fieldType
 *         type: string
 *         description: The updated field type.
 *       - in: formData
 *         name: customSectionId
 *         type: number
 *         description: The updated custom section ID.
 *       - in: formData
 *         name: fieldName
 *         type: string
 *         description: The updated field name.
 *       - in: formData
 *         name: value
 *         type: string
 *         description: The updated field value.
 *     responses:
 *       200:
 *         description: Custom Field updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: object
 *                       example:
 *                         id: 1
 *                         fieldType: "UpdatedFieldType"
 *                         fieldName: "UpdatedFieldName"
 *                         customSectionId: 2
 *                         value: "UpdatedValue"
 *       400:
 *         description: Bad request. Please provide valid field data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       404:
 *         description: Custom Field not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Custom Field not found"
 *       500:
 *         description: Error updating Custom Field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating Custom Field"
 *     tags:
 *       - custom
 */
router.put("/custom/field/:id", updateCustomField);

module.exports = router;
