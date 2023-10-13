import express from "express";
import {
  createReference,
  deleteReferenceDetail,
  getAllReference,
  getReferenceById,
} from "../controllers/reference.controller";
import { validateCreateReferenceData } from "../middlewares/reference.zod";

const router = express.Router();

/**
 * @swagger
 * /api/references/{userId}:
 *   post:
 *     summary: Create a new reference.
 *     description: Create a new reference detail for a user.
 *     tags:
 *       - References
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: The ID of the user for whom the reference is created.
 *         required: false
 *         schema:
 *           type: string
 *         example: "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
 *       - in: body
 *         name: body
 *         description: Data for creating a reference detail.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             company:
 *               type: string
 *             position:
 *               type: string
 *             emailAddress:
 *               type: string
 *             phoneNumber:
 *               type: string
 *           example:
 *             name: "Sapphire"
 *             company: "Zuri"
 *             position: "Backend Developer"
 *             emailAddress: "sofiyyahabidoye@gmail.com"
 *             phoneNumber: "08101695397"
 *     responses:
 *       201:
 *         description: Reference created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Reference created successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid request"
 */
router.post(
  "/references/:userId",
  validateCreateReferenceData,
  createReference
);

/**
 * @swagger
 * /api/references:
 *   get:
 *     summary: Get all references.
 *     description: Get all reference sections from Database.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     tags:
 *       - References
 */
router.get("/references", getAllReference);

/**
 * @swagger
 * /api/references/{id}:
 *   delete:
 *     summary: Delete a reference by ID.
 *     description: Deletes a reference detail from the database by its ID.
 *     tags:
 *       - References
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the reference detail to delete
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       200:
 *         description: Reference detail deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Reference detail deleted successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid ID Format"
 *       404:
 *         description: Reference detail not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Reference detail not found"
 */
router.delete("/references/:id", deleteReferenceDetail);

/**
 * @swagger
 * /api/references/{id}:
 *   get:
 *     summary: fetch reference Details by user ID.
 *     description: fetch a reference detail from the database by its user ID.
 *     tags:
 *       - References
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the reference detail to
 *         required: true
 *         schema:
 *           type: string
 *           minimum: 1
 *         example: "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
 *     responses:
 *       200:
 *         description: Reference detail fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: " reference detail fetched  successfully"
 *
 *       404:
 *         description: Reference detail not found
 *         content:
 *           application/json:
 *             example:
 *               error: "invalid user id "
 */

router.get("/references/:id", getReferenceById);

module.exports = router;
