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
exports.deleteSkillsService = exports.updateSkillsService = exports.getSkillsService = exports.createSkillsService = void 0;
var model_1 = require("../database/entity/model");
var data_source_1 = require("../database/data-source");
var createSkillsService = function (skillData) { return __awaiter(void 0, void 0, void 0, function () {
    var skillsDetailRepository, skills, _i, skillData_1, data, newSkill, savedskill;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                skillsDetailRepository = data_source_1.connectionSource.getRepository(model_1.SkillsDetail);
                skills = [];
                for (_i = 0, skillData_1 = skillData; _i < skillData_1.length; _i++) {
                    data = skillData_1[_i];
                    newSkill = skillsDetailRepository.create(data);
                    skills.push(newSkill);
                }
                return [4 /*yield*/, skillsDetailRepository.save(skills)];
            case 1:
                savedskill = _a.sent();
                return [2 /*return*/, { successful: true, message: "skills successfully saved" }];
        }
    });
}); };
exports.createSkillsService = createSkillsService;
var getSkillsService = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var skillsDetailRepository, savedskilldetials;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                skillsDetailRepository = data_source_1.connectionSource.getRepository(model_1.SkillsDetail);
                return [4 /*yield*/, skillsDetailRepository.find({ where: { userId: userId } })];
            case 1:
                savedskilldetials = _a.sent();
                return [2 /*return*/, savedskilldetials];
        }
    });
}); };
exports.getSkillsService = getSkillsService;
var updateSkillsService = function (skillId, updatedSkillData) { return __awaiter(void 0, void 0, void 0, function () {
    var skillsDetailRepository, skillToUpdate, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                skillsDetailRepository = data_source_1.connectionSource.getRepository(model_1.SkillsDetail);
                return [4 /*yield*/, skillsDetailRepository.findOne({
                        where: { id: skillId },
                    })];
            case 1:
                skillToUpdate = _a.sent();
                if (!skillToUpdate) {
                    return [2 /*return*/, { successful: false, message: "skill not found" }];
                }
                if (updatedSkillData.skills) {
                    skillToUpdate.skills = updatedSkillData.skills;
                }
                if (updatedSkillData.sectionId) {
                    skillToUpdate.sectionId = updatedSkillData.sectionId;
                }
                if (updatedSkillData.userId) {
                    skillToUpdate.userId = updatedSkillData.userId;
                }
                return [4 /*yield*/, skillsDetailRepository.save(skillToUpdate)];
            case 2:
                _a.sent();
                return [2 /*return*/, { successful: true, message: "skill updated successfully" }];
            case 3:
                error_1 = _a.sent();
                console.error("Error updating skill:", error_1);
                return [2 /*return*/, { successful: false, message: "Failed to update skill" }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateSkillsService = updateSkillsService;
var deleteSkillsService = function (skillId) { return __awaiter(void 0, void 0, void 0, function () {
    var skillsDetailRepository, skillToDelete, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                skillsDetailRepository = data_source_1.connectionSource.getRepository(model_1.SkillsDetail);
                return [4 /*yield*/, skillsDetailRepository.findOne({ where: { id: skillId } })];
            case 1:
                skillToDelete = _a.sent();
                if (!skillToDelete) {
                    return [2 /*return*/, { successful: false, message: "Skill not found" }];
                }
                return [4 /*yield*/, skillsDetailRepository.remove(skillToDelete)];
            case 2:
                _a.sent();
                return [2 /*return*/, { successful: true, message: "Skill deleted successfully" }];
            case 3:
                error_2 = _a.sent();
                console.error("Error deleting skill:", error_2);
                return [2 /*return*/, { successful: false, message: "Failed to delete skill" }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteSkillsService = deleteSkillsService;
//# sourceMappingURL=skills.service.js.map