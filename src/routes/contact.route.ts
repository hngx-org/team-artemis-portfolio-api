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
 * /api/v1/contacts/{user_id}:
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
 *            type: object
 *            properties:
 *                statusCode:
 *                   type: string
 *                message:
 *                   type: string
 *                success:
 *                   type: boolean
 *                payload:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                          email:
 *                             type: string
 *       404:
 *         description:  user does not exist.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             timestamp:
 *               type: string
 *             status:
 *               type: number
 *             error:
 *               type: string
 *             path:
 *               type: string
 *             success:
 *               type: boolean
 *       400:
 *         description: Bad request .
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             timestamp:
 *               type: string
 *             status:
 *               type: number
 *             error:
 *               type: string
 *             path:
 *               type: string
 *             success:
 *               type: boolean
 *
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             timestamp:
 *               type: string
 *             status:
 *               type: number
 *             error:
 *               type: string
 *             path:
 *               type: string
 *             success:
 *               type: boolean
 *     tags:
 *       - Contacts
 */
router.get("/contacts/:user_id", getContacts);

/**
 * @swagger
 * /api/v1/contacts:
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
 *         schema:
 *            type: object
 *            properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: number
 *       400:
 *         description: bad request error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             statusCode:
 *               type: number
 *             error:
 *               type: string
 *             success:
 *               type: boolean
 *     tags:
 *       - Contacts
 */

router.post("/contacts/", createContacts);

/**
 * @swagger
 * /api/v1/contacts/{id}:
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
 * /api/v1/socials:
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
 * /api/v1/socials:
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

router.get("/socials/", getSocials);

/**
 * @swagger
 * /api/v1/contact/{Id}:
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
 *             timestamp:
 *               type: string
 *             status:
 *               type: number
 *             error:
 *               type: string
 *             path:
 *               type: string
 *             success:
 *               type: boolean
 *       404:
 *         description: User not found or contact update failed.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             timestamp:
 *               type: string
 *             status:
 *               type: number
 *             error:
 *               type: string
 *             path:
 *               type: string
 *             success:
 *               type: boolean
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             timestamp:
 *               type: string
 *             status:
 *               type: number
 *             error:
 *               type: string
 *             path:
 *               type: string
 *             success:
 *               type: boolean
 *     tags:
 *       - Contacts
 */
router.patch("/contacts/:id", updateContactController);

module.exports = router;
