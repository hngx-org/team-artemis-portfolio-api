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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var supertest_1 = __importDefault(require("supertest"));
var app = require('../src/server');
var request = (0, supertest_1.default)(app);
describe('Work experience API endpoints', function () {
    var workId;
    // Endpoint to Create Work Experience section
    describe('POST api/work-experience', function () {
        it('should create Work Experience section', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('api/work-experience')
                            .send({
                            role: 'test role',
                            company: 'First company',
                            description: 'Test description',
                            startMonth: 'January',
                            startYear: 2018,
                            endMonth: 'June',
                            endYear: 2020,
                            isEmployee: true,
                        })];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(201);
                        (0, chai_1.expect)(res.body).to.be.an('object');
                        workId = res.body.id;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Endpoint to fetch Work Experience section
    describe('Get api/work-experience', function () {
        it('should fetch Work Experience section', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('api/work-experience')];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(200);
                        (0, chai_1.expect)(res.body).to.be.an('object');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Endpoint to update Work Experience section
    describe('PUT api/work-experience/:workId', function () {
        it('should update Work Experience section', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .put("api/work-experience/".concat(workId))
                            .send({ company: 'new company', description: 'Another description' })];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(200);
                        (0, chai_1.expect)(res.body).to.be.an('object');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Endpoint to Delete Work Experience section
    describe('DELETE api/work-experience/:sectionId', function () {
        it('should delete Work Experience section', function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialWork, res, updatedWork;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('api/work-experience')];
                    case 1:
                        initialWork = _a.sent();
                        return [4 /*yield*/, request
                                .delete("api/work-experience/".concat(workId))];
                    case 2:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(204);
                        return [4 /*yield*/, request.get('api/work-experience')];
                    case 3:
                        updatedWork = _a.sent();
                        (0, chai_1.expect)(updatedWork.body.length).to.equal(initialWork.body.length - 1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=work.experience.spec.js.map