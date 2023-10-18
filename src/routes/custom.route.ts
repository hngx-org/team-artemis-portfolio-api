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
  // updateCustomSection,
  customFieldSchema,
  fieldsSchema,
  getSection,
  getSingleSection,
  getSectionSchema,
  UpdateSection,
  deleteSection,
  updateSectionSchema,
} from "../controllers/custom.controller";
import { validateQuery } from "../middlewares/custom.zod";

const router = express.Router();

/**
 * @swagger
 * /api/section:
 *   post:
 *     summary: Create a new section.
 *     description: Create education details for a user.
 *     tags: [Section]
 *     parameters:
 *       - in: body
 *         name: Section details
 *         description: The data for the Section details to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             position:
 *               type: number
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             meta:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Section details created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Failed to create section details.
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
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.post("/section", validateSchema(sectionSchema), createSection);

/**
 * @swagger
 * /api/custom:
 *   post:
 *     summary: Create a new custom section
 *     description: Create a new custom section
 *     tags: [custom]
 *     parameters:
 *       - in: body
 *         name: Section details
 *         description: The data for the Section details to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             sectionId:
 *               type: number
 *             userId:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: custom Section details created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Failed to create custom section details.
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
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.post("/custom", validateSchema(customUserSectionSchema), create);

/**
 * @swagger
 * /api/custom:
 *   get:
 *     summary: Get all Custom records for user
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
 *     tags:
 *       - custom
 */
router.get("/custom", findAll);
/**
 * @swagger
 * /api/section:
 *   get:
 *     summary: Get section details.
 *     description: all sections.
 *     tags: [Section]
 *     parameters:
 *       - in: query
 *         name: name
 *         type: string
 *         description: Optional name parameter
 *     responses:
 *       200:
 *         section: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Failed to fetch section detail(s).
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
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.get("/section", validateQuery(getSectionSchema), getSection);
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
 *     tags:
 *       - custom
 */
router.get("/custom/:id", findOne);

/**
 * @swagger
 * /api/section/{id}:
 *   get:
 *     summary: Get section by id.
 *     description: Get section by id.
 *     tags: [Section]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         description: required id param
 *     responses:
 *       200:
 *         section: section not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Failed to fetch section.
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
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.get("/section/:id", getSingleSection);
/**
 * @swagger
 * /api/custom/field:
 *   post:
 *     summary: Create a new custom field
 *     description: Create a new custom field
 *     tags: [custom]
 *     parameters:
 *       - in: body
 *         name: fields
 *         type: string
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               fieldType:
 *                 type: string
 *               customSectionId:
 *                 type: number
 *               customUserSectionId:
 *                 type: number
 *               fieldName:
 *                 type: string
 *               value:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: custom fields details created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Failed to create custom fields details.
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
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 *
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
 *       - in: header
 *         name: Authorization
 *         type: string
 *         description: Optional authorization header
 *       - in: path
 *         name: id
 *         description: The ID of the custom section to delete.
 *         required: true
 *         type: integer
 *       - in: body
 *         name: userId
 *         description: user id of the user that wants to delete a section. {will be removed once the auth middleware is implemented}
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
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
 *     tags:
 *       - custom
 */
router.delete("/custom-section/:id", deleteCustomSection);

/**
 * @swagger
 * /api/section/{id}:
 *   delete:
 *     summary: Delete section by id.
 *     description: Delete section by id.
 *     tags: [Section]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         description: required id param
 *     responses:
 *       200:
 *         section: section not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Failed to fetch section.
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
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.delete("/section/:id", deleteSection);

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

/**
 * @swagger
 * /api/section/{id}:
 *   put:
 *     summary: Update section by id.
 *     description: Update section by id.
 *     tags: [Section]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         description: required id param
 *       - in: body
 *         name: section
 *         description: education details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *            name:
 *             type: string
 *            position:
 *             type: number
 *            meta:
 *             type: string
 *            description:
 *             type: string
 *     responses:
 *       200:
 *         section: section not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Failed to fetch section.
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
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.put("/section/:id", validateSchema(updateSectionSchema), UpdateSection);

module.exports = router;
