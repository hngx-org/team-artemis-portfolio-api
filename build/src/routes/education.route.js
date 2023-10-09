"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var education_controller_1 = require("../controllers/education.controller");
var router = express_1.default.Router();
router.get("/education/", education_controller_1.fetchEducationSection);
router.post("/education/", education_controller_1.createEducationDetailController);
module.exports = router;
//# sourceMappingURL=education.route.js.map