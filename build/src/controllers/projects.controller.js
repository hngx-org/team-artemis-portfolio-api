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
exports.deleteProjectById = exports.updateProjectById = exports.createProject = exports.getProjectById = exports.getAllProjects = void 0;
var model_1 = require("../database/entity/model");
var data_source_1 = require("../database/data-source");
var utils_1 = require("../utils");
var image_upload_service_1 = require("../services/image-upload.service");
var projectRepository = data_source_1.connectionSource.getRepository(model_1.Project);
var imageRepository = data_source_1.connectionSource.getRepository(model_1.Images);
var projectImageRepository = data_source_1.connectionSource.getRepository(model_1.ProjectsImage);
var getAllProjects = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, projectRepository.find()];
            case 1:
                data = _a.sent();
                (0, utils_1.success)(res, data);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                (0, utils_1.error)(res, err_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllProjects = getAllProjects;
var getProjectById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, projectRepository.findOneBy({ id: +id })];
            case 1:
                data = _a.sent();
                (0, utils_1.success)(res, data);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                (0, utils_1.error)(res, err_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProjectById = getProjectById;
var createProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, year, url, tags, description, userId, sectionId, project, data, projectId_1, files, imagesRes, imagePromises, allThumbnails, thumbnail, thumbnailId, projectUpdate, data_1, updatedProject, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                console.log(req.body.jsondata);
                _a = JSON.parse(req.body.jsondata), title = _a.title, year = _a.year, url = _a.url, tags = _a.tags, description = _a.description, userId = _a.userId, sectionId = _a.sectionId;
                if (!title ||
                    !year ||
                    !url ||
                    !tags ||
                    !description ||
                    !userId ||
                    !sectionId)
                    return [2 /*return*/, (0, utils_1.error)(res, "All fields are required", 400)];
                project = new model_1.Project();
                project.title = title;
                project.year = year;
                project.url = url;
                project.tags = tags;
                project.description = description;
                project.userId = userId;
                project.sectionId = sectionId;
                project.thumbnail = 0;
                return [4 /*yield*/, projectRepository.save(project)];
            case 1:
                data = _b.sent();
                projectId_1 = data.id;
                files = req.files;
                if (!files) {
                    return [2 /*return*/, (0, utils_1.error)(res, "Add thumbnail image", 400)];
                }
                return [4 /*yield*/, (0, image_upload_service_1.cloudinaryService)(files, req.body.service)];
            case 2:
                imagesRes = _b.sent();
                imagePromises = imagesRes.urls.map(function (url) { return __awaiter(void 0, void 0, void 0, function () {
                    var image, imageResponse, projectImage;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                image = new model_1.Images();
                                image.url = url;
                                return [4 /*yield*/, imageRepository.save(image)];
                            case 1:
                                imageResponse = _a.sent();
                                projectImage = new model_1.ProjectsImage();
                                projectImage.projectId = projectId_1;
                                projectImage.imageId = imageResponse.id;
                                return [4 /*yield*/, projectImageRepository.save(projectImage)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(imagePromises)];
            case 3:
                _b.sent();
                return [4 /*yield*/, projectImageRepository.findBy({
                        projectId: projectId_1,
                    })];
            case 4:
                allThumbnails = _b.sent();
                if (allThumbnails.length === 0) {
                    return [2 /*return*/, (0, utils_1.success)(res, data, "Created without thumbnail")];
                }
                return [4 /*yield*/, imageRepository.findOneBy({
                        id: allThumbnails[0].imageId,
                    })];
            case 5:
                thumbnail = _b.sent();
                if (!thumbnail) return [3 /*break*/, 9];
                thumbnailId = thumbnail.id;
                return [4 /*yield*/, projectRepository.findOneBy({
                        id: projectId_1,
                    })];
            case 6:
                projectUpdate = _b.sent();
                return [4 /*yield*/, projectRepository.update({ id: +projectId_1 }, { thumbnail: +thumbnailId })];
            case 7:
                data_1 = _b.sent();
                return [4 /*yield*/, projectRepository.findOneBy({
                        id: +projectId_1,
                    })];
            case 8:
                updatedProject = _b.sent();
                (0, utils_1.success)(res, updatedProject, "Successfully created");
                return [3 /*break*/, 10];
            case 9:
                (0, utils_1.success)(res, data, "Created without thumbnail");
                _b.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                err_3 = _b.sent();
                (0, utils_1.error)(res, err_3.message);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.createProject = createProject;
var updateProjectById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, year, url, tags, description, userId, sectionId, updatedProject, data, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, title = _a.title, year = _a.year, url = _a.url, tags = _a.tags, description = _a.description, userId = _a.userId, sectionId = _a.sectionId;
                return [4 /*yield*/, projectRepository.findOneBy({ id: +id })];
            case 1:
                updatedProject = _b.sent();
                if (!updatedProject) {
                    throw new Error("Project not found");
                }
                if (title) {
                    updatedProject.title = title;
                }
                if (year) {
                    updatedProject.year = year;
                }
                if (url) {
                    updatedProject.url = url;
                }
                if (tags) {
                    updatedProject.tags = tags;
                }
                if (description) {
                    updatedProject.description = description;
                }
                if (userId) {
                    updatedProject.userId = userId;
                }
                if (sectionId) {
                    updatedProject.sectionId = sectionId;
                }
                return [4 /*yield*/, projectRepository.save(updatedProject)];
            case 2:
                data = _b.sent();
                (0, utils_1.success)(res, data, "Project Updated Successfully");
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                (0, utils_1.error)(res, err_4.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateProjectById = updateProjectById;
var deleteProjectById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                if (!id) {
                    throw new Error("No project id provided");
                }
                return [4 /*yield*/, projectRepository.delete({ id: +id })];
            case 1:
                data = _a.sent();
                if (!data.affected) {
                    throw new Error("Project not found");
                }
                (0, utils_1.success)(res, data, "Project Deleted Successfully");
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                (0, utils_1.error)(res, err_5.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteProjectById = deleteProjectById;
//# sourceMappingURL=projects.controller.js.map