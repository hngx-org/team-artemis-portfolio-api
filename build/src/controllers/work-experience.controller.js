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
exports.deleteWorkExperience = exports.createWorkExperience = void 0;
var data_source_1 = require("../database/data-source");
var model_1 = require("../database/entity/model");
var utils_1 = require("../utils");
// Get the repository for the WorkExperienceDetail entity
var workExperienceRepository = data_source_1.connectionSource.getRepository(model_1.WorkExperienceDetail);
var createWorkExperience = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, company, role, startMonth, startYear, endMonth, endYear, description, isEmployee, userId, sectionId, workExperience, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, company = _a.company, role = _a.role, startMonth = _a.startMonth, startYear = _a.startYear, endMonth = _a.endMonth, endYear = _a.endYear, description = _a.description, isEmployee = _a.isEmployee, userId = _a.userId, sectionId = _a.sectionId;
                if (!userId) {
                    res.statusCode = 400;
                    return [2 /*return*/, res.json({ message: "userId is missing from request body" })];
                }
                if (sectionId === undefined) {
                    res.statusCode = 400;
                    return [2 /*return*/, res.json({ message: "sectionId is missing from request body" })];
                }
                if (!company || !role) {
                    res.statusCode = 400;
                    return [2 /*return*/, res.json({
                            message: "company or role is missing from request body",
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                workExperience = new model_1.WorkExperienceDetail();
                workExperience.company = company;
                workExperience.role = role;
                workExperience.startMonth = startMonth;
                workExperience.startYear = startYear;
                workExperience.endMonth = endMonth;
                workExperience.endYear = endYear;
                workExperience.description = description;
                workExperience.isEmployee = isEmployee;
                workExperience.userId = userId;
                workExperience.sectionId = sectionId;
                return [4 /*yield*/, workExperienceRepository.save(workExperience)];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({
                        message: "Added Work Experience Successfully",
                        data: workExperience,
                    })];
            case 3:
                err_1 = _b.sent();
                res.statusCode = 500;
                res.json({ error: err_1, message: err_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createWorkExperience = createWorkExperience;
var deleteWorkExperience = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, workExperienceToRemove, data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, workExperienceRepository.findOneBy({
                        id: id,
                    })];
            case 1:
                workExperienceToRemove = _a.sent();
                // If the work experience detail doesn't exist, return a 404 Not Found
                if (!workExperienceToRemove) {
                    return [2 /*return*/, (0, utils_1.error)(res, "Work Experience not found", 404)];
                }
                return [4 /*yield*/, workExperienceRepository.remove(workExperienceToRemove)];
            case 2:
                data = _a.sent();
                (0, utils_1.success)(res, data, "Work Experience Deleted");
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                (0, utils_1.error)(res, err_2.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteWorkExperience = deleteWorkExperience;
//# sourceMappingURL=work-experience.controller.js.map