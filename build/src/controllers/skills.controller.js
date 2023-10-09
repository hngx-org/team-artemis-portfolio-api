"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSkillsDetails = exports.deleteSkills = exports.updateSkills = exports.createSkills = void 0;
var skills_service_1 = require("../services/skills.service");
var utils_1 = require("../utils");
var createSkills = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, _a, skills, sectionId, userId, skillData, _i, skills_1, skill, data, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                authorizationHeader = _req.header("Authorization");
                _a = _req.body, skills = _a.skills, sectionId = _a.sectionId, userId = _a.userId;
                skillData = [];
                for (_i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
                    skill = skills_1[_i];
                    skillData.push({ skills: skill, sectionId: sectionId, userId: userId });
                }
                return [4 /*yield*/, (0, skills_service_1.createSkillsService)(skillData)];
            case 1:
                data = _b.sent();
                (0, utils_1.success)(res, data);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                (0, utils_1.error)(res, err_1.message); // Use type assertion to cast 'err' to 'Error' type
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createSkills = createSkills;
var updateSkills = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, skills, sectionId, userId, data, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                _a = req.body, skills = _a.skills, sectionId = _a.sectionId, userId = _a.userId;
                return [4 /*yield*/, (0, skills_service_1.updateSkillsService)(id, { skills: skills, sectionId: sectionId, userId: userId })];
            case 1:
                data = _b.sent();
                if (data.successful) {
                    (0, utils_1.success)(res, data);
                }
                else {
                    (0, utils_1.error)(res, data.message);
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                (0, utils_1.error)(res, err_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateSkills = updateSkills;
var deleteSkills = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, (0, skills_service_1.deleteSkillsService)(id)];
            case 1:
                data = _a.sent();
                if (data.successful) {
                    (0, utils_1.success)(res, data);
                }
                else {
                    (0, utils_1.error)(res, data.message);
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                (0, utils_1.error)(res, err_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteSkills = deleteSkills;
// Controller function to fetch skills for a logged-in user
var getSkillsDetails = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, userId, data, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authorizationHeader = _req.header("Authorization");
                userId = _req.body.userId;
                return [4 /*yield*/, (0, skills_service_1.getSkillsService)(userId)];
            case 1:
                data = _a.sent();
                // Send a response with the fetched skills
                (0, utils_1.success)(res, data, "Skills");
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error("Error fetching skills:", utils_1.error);
                (0, utils_1.error)(res, err_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSkillsDetails = getSkillsDetails;
//# sourceMappingURL=skills.controller.js.map