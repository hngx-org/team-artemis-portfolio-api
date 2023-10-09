import express from "express";

import {
  createContacts,
  getContacts,
  deleteContact,
} from "../controllers/contacts.controller";

const router = express.Router();

router.get("/contacts/:user_id", getContacts);
router.post("/contacts/", createContacts);
router.delete("/contacts/:id", deleteContact);

module.exports = router;
