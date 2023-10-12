import express from "express";
import { 
   addCertificateController, 
   deleteCertificate, 
   getAllCertificates, 
   getCertificateById
} from "../controllers/certificate.controller";

const router = express.Router();

/**
 * @swagger
 * /api/add-certificate/{userId}:
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
 *         description: Certificate details successfully created. Returns the just created certificate.
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


/**
 * @swagger
 * /certifications:
 *   get:
 *     summary: Get all certificates.
 *     description: Get a list of all certificates.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of certificates.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 certificates:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: An array of certificates.
 *       404:
 *         description: No certificates found.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/certifications", getAllCertificates)

/**
 * @swagger
 * /certifications/{certId}:
 *   delete:
 *     summary: Delete a certificate by ID.
 *     description: Delete a certificate by its unique ID.
 *     parameters:
 *       - in: path
 *         name: certId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Certificate deleted successfully. Returns a list of updated certificates.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 certificates:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: An array of updated certificates.
 *       404:
 *         description: Certificate not found.
 *       500:
 *         description: Internal Server Error.

 */
router.delete('/certifications/:certId', deleteCertificate);


/**
 * @swagger
 * /certifications/{certId}:
 *   get:
 *     summary: Get a certificate by ID.
 *     description: Get a certificate by its unique ID.
 *     parameters:
 *       - in: path
 *         name: certId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the certificate.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 certificate:
 *                   type: object
 *                   description: The retrieved certificate.
 *       404:
 *         description: Certificate not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/certifications/:certId', getCertificateById);


module.exports = router;

