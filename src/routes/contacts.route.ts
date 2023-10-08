import express from "express";

import {
  createContacts,
  getContacts,
} from "../controllers/contacts.controller";

const router = express.Router();

router.get("/contacts/:user_id", getContacts);
router.post("/contacts/", createContacts);

module.exports = router;
