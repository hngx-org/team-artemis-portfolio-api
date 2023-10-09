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
exports.deleteUserAccount = exports.createNotificationSettingController = exports.createAccountSettingController = void 0;
var utils_1 = require("../utils");
var model_1 = require("../database/entity/model");
var data_source_1 = require("../database/data-source");
var user_1 = require("../database/entity/user");
var settings_service_1 = require("../services/settings.service");
var userRespository = data_source_1.connectionSource.getRepository(user_1.User);
var createAccountSettingController = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, currentPassword, newPassword, confirmNewPassword, error, user, hashedPassword, updateUser, error_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, email = _a.email, currentPassword = _a.currentPassword, newPassword = _a.newPassword, confirmNewPassword = _a.confirmNewPassword;
                error = settings_service_1.accountSettingSchema.validate({
                    email: email,
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword,
                }).error;
                if (error) {
                    return [2 /*return*/, res.status(400).json({
                            status: "error",
                            method: req.method,
                            message: error.message,
                        })];
                }
                return [4 /*yield*/, userRespository.findOne({ where: { email: email } })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            status: "error",
                            message: "User not found",
                            success: false,
                        })];
                }
                if (currentPassword !== user.password) {
                    return [2 /*return*/, res.status(400).json({
                            status: "error",
                            message: "Incorrect user email or password input",
                            success: false,
                        })];
                }
                return [4 /*yield*/, (0, settings_service_1.hashPassword)(newPassword)];
            case 2:
                hashedPassword = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, data_source_1.connectionSource
                        .createQueryBuilder()
                        .update(user_1.User)
                        .set({ password: hashedPassword })
                        .where("email = :email", { email: email })
                        .execute()];
            case 4:
                updateUser = _b.sent();
                if (updateUser.affected === 0) {
                    return [2 /*return*/, res.status(404).json({
                            status: "error",
                            message: "User password not updated",
                            success: false,
                        })];
                }
                return [2 /*return*/, (0, utils_1.success)(res, updateUser, "User password updated successfully")];
            case 5:
                error_1 = _b.sent();
                console.error(error_1); // Log the error for debugging
                return [2 /*return*/, res.status(500).json({
                        status: "error",
                        message: "Failed to update user password",
                        success: false,
                    })];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_2 = _b.sent();
                console.error(error_2); // Log the error for debugging
                return [2 /*return*/, res.status(500).json({
                        status: "error",
                        message: "Internet error",
                        success: false,
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createAccountSettingController = createAccountSettingController;
var createNotificationSettingController = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, communityUpdate, emailSummary, newMessages, followUpdate, specialOffers, notificationSettingRepository, isExistingUser, notificationSetting, notificationInfo, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                userId = req.params.userId;
                _a = req.body, communityUpdate = _a.communityUpdate, emailSummary = _a.emailSummary, newMessages = _a.newMessages, followUpdate = _a.followUpdate, specialOffers = _a.specialOffers;
                notificationSettingRepository = data_source_1.connectionSource.getRepository(model_1.NotificationSetting);
                return [4 /*yield*/, notificationSettingRepository.findOne({
                        where: { userId: userId },
                    })];
            case 1:
                isExistingUser = _b.sent();
                if (!isExistingUser) {
                    return [2 /*return*/, res.status(404).json({
                            status: "error",
                            message: "User does not exist",
                            success: false,
                        })];
                }
                notificationSetting = new model_1.NotificationSetting();
                notificationSetting.communityUpdate = communityUpdate || false;
                notificationSetting.emailSummary = emailSummary || false;
                notificationSetting.newMessages = newMessages || false;
                notificationSetting.followUpdate = followUpdate || false;
                notificationSetting.specialOffers = specialOffers || false;
                notificationSetting.userId = userId;
                return [4 /*yield*/, notificationSettingRepository.save(notificationSetting)];
            case 2:
                notificationInfo = _b.sent();
                if (!notificationInfo) {
                    res.status(404).json({
                        status: "error",
                        message: "Notification settings not activated",
                        success: false,
                    });
                }
                (0, utils_1.success)(res, notificationInfo, "activated notification");
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.log(error_3),
                    res.status(500).json({
                        status: "error",
                        message: "Internet error",
                        success: false,
                    });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createNotificationSettingController = createNotificationSettingController;
var deleteUserAccount = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, isExistingUser, destroyAccount, error_4, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                userId = req.params.userId;
                return [4 /*yield*/, userRespository.findOne({
                        where: { id: userId },
                    })];
            case 1:
                isExistingUser = _a.sent();
                if (!isExistingUser) {
                    return [2 /*return*/, res.status(404).json({
                            status: "error",
                            message: "User does not exist",
                            success: false,
                        })];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, data_source_1.connectionSource
                        .createQueryBuilder()
                        .delete()
                        .from(user_1.User)
                        .where("id = :id", { id: userId })
                        .execute()];
            case 3:
                destroyAccount = _a.sent();
                if (destroyAccount.affected === 0) {
                    return [2 /*return*/, res.status(404).json({
                            status: "error",
                            message: "Account not deleted",
                            success: false,
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        status: "success",
                        message: "Account deleted successfully",
                        data: destroyAccount,
                        success: true,
                    })];
            case 4:
                error_4 = _a.sent();
                console.error(error_4); // Log the error for debugging
                return [2 /*return*/, res.status(500).json({
                        status: "error",
                        message: "Failed to delete account",
                        success: false,
                    })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_5 = _a.sent();
                console.error(error_5); // Log the error for debugging
                return [2 /*return*/, res.status(500).json({
                        status: "error",
                        message: "Internet error",
                        success: false,
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserAccount = deleteUserAccount;
//# sourceMappingURL=settings.controller.js.map