"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var model_1 = require("./model");
var User = exports.User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, name: "first_name" }),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, name: "last_name" }),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true, name: "section_order" }),
        __metadata("design:type", String)
    ], User.prototype, "sectionOrder", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "provider", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            nullable: true,
            name: "is_verified",
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isVerified", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true, name: "2fa", default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "twoFactorAuth", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true, name: "profile_pic" }),
        __metadata("design:type", String)
    ], User.prototype, "profilePic", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true,
            name: "refresh_token",
        }),
        __metadata("design:type", String)
    ], User.prototype, "refreshToken", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        (0, typeorm_1.OneToMany)(function () { return model_1.SocialUser; }, function (socialUser) { return socialUser.userId; }),
        __metadata("design:type", Array)
    ], User.prototype, "socialUsers", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)({ name: "user" })
    ], User);
    return User;
}());
//# sourceMappingURL=user.js.map