import express from "express";
import {
  createContacts,
  getContacts,
  deleteContact,
} from "../controllers/contacts.controller";

const router = express.Router();

/**
 * @swagger
 * /api/contacts/{user_id}:
 *   get:
 *     summary: Get contacts by user ID
 *     description: Retrieve contacts for a specific user by their ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: The ID of the user whose contacts are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: Contacts not found for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
 *     requestBody:
 *       description: The data for the contact to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully.
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
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contact to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contact deleted successfully.
 *       404:
 *         description: Contact not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to delete contact.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     tags:
 *       - Contacts
 */
router.delete("/contacts/:id", deleteContact);

module.exports = router;
