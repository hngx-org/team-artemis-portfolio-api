"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var contacts_controller_1 = require("../controllers/contacts.controller");
var router = express_1.default.Router();
router.get("/contacts/:user_id", contacts_controller_1.getContacts);
router.post("/contacts/", contacts_controller_1.createContacts);
module.exports = router;
//# sourceMappingURL=contacts.route.js.map