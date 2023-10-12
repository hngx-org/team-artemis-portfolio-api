import express from "express";
import { addCertificateController } from "../controllers/certificate.controller";

const router = express.Router();

/**
 * @swagger
 * /add-certificate/{userId}:
 *   post:
 *     summary: Create certificate details for a user with a specified ID.
 *     description: Create certificate details for a user.
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user for whom to create certificate details.
 *       - in: body
 *         name: certificateDetails
 *         description: The data for the certificate details to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             year:
 *               type: string
 *             organization:
 *               type: string
 *             url:
 *               type: string
 *             description:
 *               type: string
 *             sectionId:
 *               type: number
 *         example:
 *           title: "Certificate Title"
 *           year: "2023"
 *           organization: "Certificate Organization"
 *           url: "https://example.com"
 *           description: "Certificate Description"
 *           sectionId: 2
 *     responses:
 *       201:
 *         description: Certificate details successfully created.
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
 *       400:
 *         description: Error creating certificate details.
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
 *                   example: "Invalid input for certificate details."
 *                 data:
 *                   type: null
 *       404:
 *         description: User not found. Please provide a valid User ID.
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
 *                   example: "User not found."
 *                 data:
 *                   type: null
 */
router.post("/add-certificate/:userId", addCertificateController);

module.exports = router;
