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
exports.getContacts = exports.createContacts = void 0;
var data_source_1 = require("../database/data-source");
var model_1 = require("../database/entity/model");
//CREATES A NEW CONTACTS SECTION USING SOCIAL HANDLES
var createContacts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, url, user_id, social_media_id, contactsRepo, contact, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, url = _a.url, user_id = _a.user_id, social_media_id = _a.social_media_id;
                contactsRepo = data_source_1.connectionSource.getRepository(model_1.SocialUser);
                contact = contactsRepo.create({
                    url: url,
                    userId: user_id,
                    socialMediaId: social_media_id,
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, contactsRepo.save(contact)];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(201).json({ message: "Contact created successfully" })];
            case 3:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.sendStatus(503)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createContacts = createContacts;
// GET ALL CONTACTS OF A USER USING THE USER ID as request parameter
var getContacts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, contactsRepo, contacts, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.params.user_id;
                contactsRepo = data_source_1.connectionSource.getRepository(model_1.SocialUser);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, contactsRepo.find({
                        where: { userId: String(user_id) },
                    })];
            case 2:
                contacts = _a.sent();
                return [2 /*return*/, res.status(200).json(contacts)];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.json({ status: 409, message: "OOps! an error occured" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getContacts = getContacts;
//# sourceMappingURL=contacts.controller.js.map