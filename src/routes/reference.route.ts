import express from "express";
import { createReference, deleteReferenceDetail } from "../controllers/reference.controller"; 
import { validateCreateReferenceData } from "../middlewares/reference.zod"; 

const router = express.Router();

/**
 * @swagger
 * /api/references:
 *   post:
 *     summary: Create a new reference.
 *     description: Create a new reference detail for a user.
 *     tags:
 *       - References
 *     parameters:
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
 *             userId:
 *               type: string
 *           example:
 *             name: "Sapphire"
 *             company: "Zuri"
 *             position: "Backend Developer"
 *             emailAddress: "sofiyyahabidoye@gmail.com"
 *             phoneNumber: "08101695397"
 *             userId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
 *     responses:
 *       201:
 *         description: Reference created successfully
 *       400:
 *         description: Bad request
 */
router.post("/references", validateCreateReferenceData, createReference);

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
 *     responses:
 *       200:
 *         description: Reference detail deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Reference detail not found
 */
router.delete("/references/:id", deleteReferenceDetail);

module.exports = router;
