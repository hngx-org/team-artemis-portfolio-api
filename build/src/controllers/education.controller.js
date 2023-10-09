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
exports.fetchEducationSection = exports.updateEducationDetail = exports.createEducationDetailController = void 0;
var data_source_1 = require("../database/data-source");
var model_1 = require("../database/entity/model");
var education_service_1 = require("../services/education.service");
// Endpoint to fetch the education section
var fetchEducationSection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, educationRepository, educationDetails, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                educationRepository = data_source_1.connectionSource.getRepository(model_1.EducationDetail);
                return [4 /*yield*/, educationRepository.find({
                        where: { userId: userId },
                        relations: ["degree", "section", "user"],
                    })];
            case 1:
                educationDetails = _a.sent();
                if (educationDetails.length === 0) {
                    return [2 /*return*/, res.status(404).json({ error: "No user education information" })];
                }
                res.status(200).json({ educationDetails: educationDetails });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.fetchEducationSection = fetchEducationSection;
// Get the repository for the EducationDetail entity
var educationDetailRepository = data_source_1.connectionSource.getRepository(model_1.EducationDetail);
var createEducationDetailController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, degreeId, fieldOfStudy, school, from, description, to, userId, sectionId, requiredFields, missingFields, educationDetail, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, degreeId = _a.degreeId, fieldOfStudy = _a.fieldOfStudy, school = _a.school, from = _a.from, description = _a.description, to = _a.to, userId = _a.userId, sectionId = _a.sectionId;
                requiredFields = [
                    "degreeId",
                    "fieldOfStudy",
                    "school",
                    "from",
                    "description",
                    "to",
                    "userId",
                    "sectionId",
                ];
                missingFields = requiredFields.filter(function (field) { return !req.body[field]; });
                if (missingFields.length > 0) {
                    return [2 /*return*/, res.status(400).json({
                            error: "The following fields are missing: ".concat(missingFields.join(", ")),
                        })];
                }
                return [4 /*yield*/, (0, education_service_1.createEducationDetail)({
                        degreeId: degreeId,
                        fieldOfStudy: fieldOfStudy,
                        school: school,
                        from: from,
                        description: description,
                        to: to,
                        userId: userId,
                        sectionId: sectionId,
                    })];
            case 1:
                educationDetail = _b.sent();
                // Return the created education detail as a JSON response
                res.status(201).json({ educationDetail: educationDetail });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error("Error creating education detail:", error_2.message);
                res.status(500).json({ error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createEducationDetailController = createEducationDetailController;
var updateEducationDetail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, educationDetail, updateData, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = parseInt(req.params.id);
                console.log("starting");
                return [4 /*yield*/, educationDetailRepository.findOne({
                        where: { id: id },
                    })];
            case 1:
                educationDetail = _a.sent();
                console.log("almost found");
                if (!educationDetail) {
                    return [2 /*return*/, res.status(404).json({ message: "Education not found" })];
                }
                console.log("found");
                updateData = req.body;
                if (updateData.fieldOfStudy)
                    educationDetail.fieldOfStudy = updateData.fieldOfStudy;
                if (updateData.school)
                    educationDetail.school = updateData.school;
                if (updateData.from)
                    educationDetail.from = updateData.from;
                if (updateData.to)
                    educationDetail.to = updateData.to;
                if (updateData.description)
                    educationDetail.description = updateData.description;
                if (updateData.degreeId)
                    educationDetail.degreeId = updateData.degreeId;
                if (updateData.userId)
                    educationDetail.userId = updateData.userId;
                if (updateData.sectionId)
                    educationDetail.sectionId = updateData.sectionId;
                // Save the updated education detail
                return [4 /*yield*/, educationDetailRepository.save(educationDetail)];
            case 2:
                // Save the updated education detail
                _a.sent();
                res.status(200).json({
                    message: "Education detail updated successfully",
                    educationDetail: educationDetail,
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Error updating education detail:", error_3);
                if (error_3 instanceof SyntaxError) {
                    // Handle JSON parsing error
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Invalid JSON format in request body" })];
                }
                else if (error_3.code === "23505") {
                    // Handle duplicate key constraint violation (unique constraint violation)
                    return [2 /*return*/, res
                            .status(409)
                            .json({ message: "Duplicate key value in the database" })];
                }
                else if (error_3.code === "22P02") {
                    // Handle invalid integer format error
                    return [2 /*return*/, res.status(400).json({ message: "Invalid ID format" })];
                }
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateEducationDetail = updateEducationDetail;
//# sourceMappingURL=education.controller.js.map