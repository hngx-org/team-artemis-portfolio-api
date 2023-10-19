import express from "express";
import {
  addCertificateController,
  deleteCertificate,
  getAllCertificates,
  getCertificateById,
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
 * /api/certificates/{userId}:
 *   get:
 *     summary: Get all certificates for a specific user.
 *     description: Retrieve a list of all available certificates for a specific user.
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user for whom certificates are being retrieved.
 *     responses:
 *       200:
 *         description: Certificates retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the certificate.
 *                   title:
 *                     type: string
 *                     description: The title of the certificate.
 *                   year:
 *                     type: string
 *                     description: The year the certificate was obtained.
 *                   organization:
 *                     type: string
 *                     description: The organization that issued the certificate.
 *                   url:
 *                     type: string
 *                     description: The URL associated with the certificate.
 *                   description:
 *                     type: string
 *                     description: Additional description of the certificate.
 *       404:
 *         description: No certificates found. There are no certificates available for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that no certificates were found for the specified user.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/certificates/:userId", getAllCertificates);

/**
 * @swagger
 * /api/certificates/{certId}:
 *   delete:
 *     summary: Delete a certificate by ID.
 *     description: Delete a certificate by its unique certificate ID.
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: certId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the certificate to be deleted.
 *     responses:
 *       200:
 *         description: Certificate deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the certificate was deleted.
 *                 certificates:
 *                   type: array
 *                   description: An array of remaining certificates after the deletion.
 *       404:
 *         description: Certificate not found. The specified certificate ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the certificate was not found.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete("/certificates/:certId", deleteCertificate);

/**
 * @swagger
 * /api/certificates/{certId}:
 *   get:
 *     summary: Get a certificate by ID.
 *     description: Retrieve a certificate by its unique certificate ID.
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: certId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the certificate to retrieve.
 *     responses:
 *       200:
 *         description: Certificate retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the certificate.
 *                 title:
 *                   type: string
 *                   description: The title of the certificate.
 *                 year:
 *                   type: string
 *                   description: The year the certificate was obtained.
 *                 organization:
 *                   type: string
 *                   description: The organization that issued the certificate.
 *                 url:
 *                   type: string
 *                   description: The URL associated with the certificate.
 *                 description:
 *                   type: string
 *                   description: Additional description of the certificate.
 *       404:
 *         description: Certificate not found. The specified certificate ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the certificate was not found.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/certificate/:certId", getCertificateById);

module.exports = router;
