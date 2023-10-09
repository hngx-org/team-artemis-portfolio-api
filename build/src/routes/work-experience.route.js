"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var work_experience_controller_1 = require("../controllers/work-experience.controller");
var router = express_1.default.Router();
router.post("/create-work-experience", work_experience_controller_1.createWorkExperience);
router.delete("/work-experience/:id", work_experience_controller_1.deleteWorkExperience);
module.exports = router;
//# sourceMappingURL=work-experience.route.js.map