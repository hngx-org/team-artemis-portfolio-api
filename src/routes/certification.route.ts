import express from 'express';
import { updateCertificate } from '../controllers/certification.controller';

const router = express.Router();

/**
 * @swagger
 * /api/certification/{id}:
 *   put:
 *     summary: Update a user's certificate by ID
 *     description: Update a user's certificate by providing its ID.
 *     tags: [Certification]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The id of the certificate to be updated
 *         required: true
 *         type: integer
 *       - in: body
 *         name: payload
 *         description: New certificate details.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             year:
 *               type: number
 *             organization:
 *               type: string
 *             url: 
 *               type: string
 *             description
 *               type: string
 *     responses:
 *       201:
 *         description: certificate updated successfully.
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
 *                       example: "certificate updated successfully"
 *                     data:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         year:
 *                           type: number
 *                         organization:
 *                           type: string
 *                         url: 
 *                           type: string
 *                         description
 *                           type: string
 *       400:
 *         description: Invalid parameter id or parameter id not provided
 *         content:
 *           application/json
 *             schema:
 *               type: object
 *               properties;
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Please provide as a parameter an integer id"
 *       404:
 *         description: certificate not found.
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
 *                   example: "certificate not found"
 *                 data:
 *                   type: null
 *       500:
 *         description: Error updating certificate
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
 *                   example: "Error updating certificate"
 *                 data:
 *                   type: null
 */

router.put('/certification/:userId/:id', updateCertificate)

module.exports = router;