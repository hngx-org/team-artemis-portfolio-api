import express from "express";
// import { updateContactController } from '../controllers/contact.controller'
import {
  createSocials,
  getSocials,
  createContacts,
  getContacts,
  deleteContact,
  updateContactController,
} from "../controllers/contact.controller";

const router = express.Router();

/**
 * @swagger
 * /api/contacts/{user_id}:
 *   get:
 *     summary: Get contacts by user ID
 *     description: Retrieve contacts for a specific user by their ID.
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: The ID of the user whose contacts are to be retrieved.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully.
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *         example:
 *           - name: "John Doe"
 *             email: "john@example.com"
 *       404:
 *         description: Contacts not found for the specified user.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *     tags:
 *       - Contacts
 */
router.get("/contacts/:user_id", getContacts);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Create a new contact for a user.
 *     parameters:
 *       - in: body
 *         name: create contacts
 *         description: creating new social media contact account
 *         required: true
 *         schema:
 *            type: object
 *            properties:
 *              user_id:
 *                  type: string
 *              social_media_id:
 *                  type: number
 *              url:
 *                  type: string
 *
 *     responses:
 *       201:
 *         description: Resource created successfully.
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
 *       400:
 *         description: Failed to create contact.
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
 *                   example: "Failed to create contact"
 *                 data:
 *                   type: null
 *     tags:
 *       - Contacts
 */

router.post("/contacts/", createContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     description: Delete a contact by providing its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the contact to delete.
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Contact deleted successfully.
 *       404:
 *         description: Contact not found.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Failed to delete contact.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *     tags:
 *       - Contacts
 */
router.delete("/contacts/:id", deleteContact);

/**
 * @swagger
 * /api/socials:
 *   post:
 *     summary: Create a new social media type
 *     description: Create a new social media type.
 *     parameters:
 *       - name: name
 *         in: body
 *         description: The name of the social media type.
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Social Media type created successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *         example:
 *           message: "Social Media type created successfully"
 *       400:
 *         description: Invalid input data.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *         example:
 *           message: "Invalid input data"
 *     tags:
 *       - Contacts
 */
router.post("/socials", createSocials);

/**
 * @swagger
 * /api/socials:
 *   get:
 *     summary: fetches all social media types 
 *     description: Create a new social media type.
 *     responses:
 *       200:
 *         description: Social Media types fetched successfully.
 *         schema:
 *           type: object
 *           properties:
 *            data:
 *               type: object
 *         example:
 *           {statusCode: 200, status:'success', data:data}
 *       500:
 *         description: error fetching data.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *         example:
 *           message: "oops something happened"
 *     tags:
 *       - Contacts
 */

router.get('/socials/', getSocials)

/**
 * @swagger
 * /api/contact/{Id}:
 *   patch:
 *     summary: Update a contact by ID
 *     description: Update a contact by providing its ID.
 *     parameters:
 *       - name: Id
 *         in: path
 *         description: The ID of the contact to update.
 *         required: true
 *         type: string
 *     requestBody:
 *       description: The data for the contact to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               socialMediaId:
 *                 type: number
 *               url:
 *                 type: string
 *               userId:
 *                 type: string
 *             example:
 *               socialMediaId: 1
 *               url: "https://example.com"
 *               userId: "user123"
 *     responses:
 *       200:
 *         description: Contact updated successfully.
 *       400:
 *         description: Invalid input data.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *         example:
 *           message: "Invalid input data"
 *       404:
 *         description: User not found or contact update failed.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *         example:
 *           message: "User not found or contact update failed"
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *         example:
 *           message: "Internal server error"
 *     tags:
 *       - Contacts
 */
router.patch("/contact/:Id", updateContactController);

module.exports = router;
