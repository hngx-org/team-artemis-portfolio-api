import express from "express";

import { createContacts, getContacts } from '../controllers/contacts.controller'

const router = express.Router();

router.get("api/contacts/:user_id", getContacts);
router.post("api/contacts/", createContacts);

export default router;