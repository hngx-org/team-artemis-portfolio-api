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
exports.InterestDetail = exports.SkillsDetail = exports.AboutDetail = exports.Degree = exports.EducationDetail = exports.Project = exports.WorkExperienceDetail = exports.Images = exports.Tracks = exports.Section = exports.MailType = exports.ComplaintComment = exports.Complaint = exports.Report = exports.PortfoliosAnalytics = exports.SalesAnalytics = exports.UserAnalytics = exports.App = exports.RolesPermissions = exports.UserPermissions = exports.Permissions = exports.UserRoles = exports.Roles = exports.AssessmentCategory = exports.UserBadge = exports.Answer = exports.Question = exports.Skill = exports.EmailVerification = exports.SalesReport = exports.Activity = exports.PromoProduct = exports.StoreTraffic = exports.TrackPromotion = exports.UserProductRating = exports.Product = exports.Revenue = exports.ProductImage = exports.Shop = exports.Promotion = exports.SkillBadge = exports.Assessment = exports.ProductCategory = exports.Order = exports.Transaction = exports.UserAssessment = exports.UserAssessmentProgress = exports.PortfolioDetails = exports.UserTrack = exports.MailLog = void 0;
exports.Coupon = exports.ProductReview = exports.OrderItem = exports.Cart = exports.ProjectsImage = exports.NotificationSetting = exports.CustomField = exports.CustomUserSection = exports.SocialUser = exports.SocialMedia = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var STATUS;
(function (STATUS) {
    STATUS["PENDING"] = "pending";
    STATUS["COMPLETE"] = "complete";
    STATUS["FAILED"] = "failed";
})(STATUS || (STATUS = {}));
var ADMIN_STATUS;
(function (ADMIN_STATUS) {
    ADMIN_STATUS["PENDING"] = "pending";
    ADMIN_STATUS["REVIEW"] = "reviewed";
    ADMIN_STATUS["APPROVED"] = "approved";
    ADMIN_STATUS["BLACKLIST"] = "blacklisted";
})(ADMIN_STATUS || (ADMIN_STATUS = {}));
var BADGES;
(function (BADGES) {
    BADGES["BEGINNER"] = "Beginner";
    BADGES["INTERMEDIATE"] = "Intermediate";
    BADGES["EXPERT"] = "Expert";
})(BADGES || (BADGES = {}));
var DISCOUNT_TYPE;
(function (DISCOUNT_TYPE) {
    DISCOUNT_TYPE["PERCENTAGE"] = "Percentage";
    DISCOUNT_TYPE["FIXED"] = "Fixed";
})(DISCOUNT_TYPE || (DISCOUNT_TYPE = {}));
var RESTRICTED;
(function (RESTRICTED) {
    RESTRICTED["NO"] = "no";
    RESTRICTED["TEMPORARY"] = "temporary";
    RESTRICTED["PERMANENT"] = "permanent";
})(RESTRICTED || (RESTRICTED = {}));
var MailLog = exports.MailLog = /** @class */ (function () {
    function MailLog() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], MailLog.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 225, nullable: true }),
        __metadata("design:type", String)
    ], MailLog.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "json", nullable: true }),
        __metadata("design:type", Object)
    ], MailLog.prototype, "messageData", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "message_type_id" }),
        __metadata("design:type", Number)
    ], MailLog.prototype, "messageType", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["pending", "complete", "failed"],
            default: "pending",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], MailLog.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], MailLog.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "updated_at",
        }),
        __metadata("design:type", Date)
    ], MailLog.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 225,
            nullable: true,
            name: "request_origin",
        }),
        __metadata("design:type", String)
    ], MailLog.prototype, "requestOrigin", void 0);
    MailLog = __decorate([
        (0, typeorm_1.Entity)({ name: "mail_log" })
    ], MailLog);
    return MailLog;
}());
var UserTrack = exports.UserTrack = /** @class */ (function () {
    function UserTrack() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserTrack.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], UserTrack.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], UserTrack.prototype, "trackId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.id; }),
        __metadata("design:type", user_1.User)
    ], UserTrack.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tracks; }, function (track) { return track.id; }),
        __metadata("design:type", Tracks)
    ], UserTrack.prototype, "track", void 0);
    UserTrack = __decorate([
        (0, typeorm_1.Entity)({ name: "user_track" })
    ], UserTrack);
    return UserTrack;
}());
var PortfolioDetails = exports.PortfolioDetails = /** @class */ (function () {
    function PortfolioDetails() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PortfolioDetails.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { nullable: true }),
        __metadata("design:type", String)
    ], PortfolioDetails.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { nullable: true }),
        __metadata("design:type", String)
    ], PortfolioDetails.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], PortfolioDetails.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.id; }),
        __metadata("design:type", user_1.User)
    ], PortfolioDetails.prototype, "user", void 0);
    PortfolioDetails = __decorate([
        (0, typeorm_1.Entity)({ name: "portfolio_details" })
    ], PortfolioDetails);
    return PortfolioDetails;
}());
var UserAssessmentProgress = exports.UserAssessmentProgress = /** @class */ (function () {
    function UserAssessmentProgress() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserAssessmentProgress.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "user_assessment_id" }),
        __metadata("design:type", Number)
    ], UserAssessmentProgress.prototype, "userAssessmentId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "question_id" }),
        __metadata("design:type", Number)
    ], UserAssessmentProgress.prototype, "questionId", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["pending", "complete", "failed"],
            default: "pending",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], UserAssessmentProgress.prototype, "status", void 0);
    UserAssessmentProgress = __decorate([
        (0, typeorm_1.Entity)({ name: "user_assessment_progress" })
    ], UserAssessmentProgress);
    return UserAssessmentProgress;
}());
var UserAssessment = exports.UserAssessment = /** @class */ (function () {
    function UserAssessment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserAssessment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], UserAssessment.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "assessment_id" }),
        __metadata("design:type", Number)
    ], UserAssessment.prototype, "assessmentId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], UserAssessment.prototype, "score", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["pending", "complete", "failed"],
            default: "pending",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], UserAssessment.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true, name: "submission_date" }),
        __metadata("design:type", Date)
    ], UserAssessment.prototype, "submissionDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], UserAssessment.prototype, "createdAt", void 0);
    UserAssessment = __decorate([
        (0, typeorm_1.Entity)({ name: "user_assessment" })
    ], UserAssessment);
    return UserAssessment;
}());
var Transaction = exports.Transaction = /** @class */ (function () {
    function Transaction() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Transaction.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "order_id" }),
        __metadata("design:type", String)
    ], Transaction.prototype, "orderId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "app_id" }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "appId", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["pending", "complete", "failed"],
            default: "pending",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Transaction.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Transaction.prototype, "currency", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true,
            name: "provider_ref",
        }),
        __metadata("design:type", String)
    ], Transaction.prototype, "providerRef", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, name: "in_app_ref" }),
        __metadata("design:type", String)
    ], Transaction.prototype, "inAppRef", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Transaction.prototype, "provider", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], Transaction.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "updated_at",
        }),
        __metadata("design:type", Date)
    ], Transaction.prototype, "updatedAt", void 0);
    Transaction = __decorate([
        (0, typeorm_1.Entity)({ name: "transaction" })
    ], Transaction);
    return Transaction;
}());
var Order = exports.Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Order.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Order.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "bigint", nullable: true }),
        __metadata("design:type", Number)
    ], Order.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Order.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "numeric",
            precision: 10,
            scale: 2,
            nullable: true,
            name: "subtotal",
        }),
        __metadata("design:type", Number)
    ], Order.prototype, "VAT", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "numeric",
            precision: 10,
            scale: 2,
            nullable: true,
            name: "VAT",
        }),
        __metadata("design:type", Number)
    ], Order.prototype, "subtotal", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "product_id" }),
        __metadata("design:type", String)
    ], Order.prototype, "productId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "merchant_id" }),
        __metadata("design:type", String)
    ], Order.prototype, "merchantId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "customer_id" }),
        __metadata("design:type", String)
    ], Order.prototype, "customerId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "promo" }),
        __metadata("design:type", Number)
    ], Order.prototype, "promo", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["pending", "complete", "failed"],
            default: "pending",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Order.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], Order.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "updated_at",
        }),
        __metadata("design:type", Date)
    ], Order.prototype, "updatedAt", void 0);
    Order = __decorate([
        (0, typeorm_1.Entity)({ name: "order" })
    ], Order);
    return Order;
}());
var ProductCategory = exports.ProductCategory = /** @class */ (function () {
    function ProductCategory() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ProductCategory.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 225, nullable: true }),
        __metadata("design:type", String)
    ], ProductCategory.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "parent_category_id" }),
        __metadata("design:type", Number)
    ], ProductCategory.prototype, "parentCategoryId", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["pending", "complete", "failed"],
            default: "pending",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], ProductCategory.prototype, "status", void 0);
    ProductCategory = __decorate([
        (0, typeorm_1.Entity)({ name: "product_category" })
    ], ProductCategory);
    return ProductCategory;
}());
var Assessment = exports.Assessment = /** @class */ (function () {
    function Assessment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Assessment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "skill_id" }),
        __metadata("design:type", Number)
    ], Assessment.prototype, "skillId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Assessment.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", String)
    ], Assessment.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true, name: "start_date" }),
        __metadata("design:type", Date)
    ], Assessment.prototype, "startDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true, name: "end_date" }),
        __metadata("design:type", Date)
    ], Assessment.prototype, "endDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "duration_minutes" }),
        __metadata("design:type", Number)
    ], Assessment.prototype, "durationMinutes", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "numeric",
            precision: 10,
            scale: 2,
            nullable: true,
            name: "pass_score",
        }),
        __metadata("design:type", Number)
    ], Assessment.prototype, "passScore", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["pending", "complete", "failed"],
            default: "pending",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Assessment.prototype, "status", void 0);
    Assessment = __decorate([
        (0, typeorm_1.Entity)({ name: "assessment" })
    ], Assessment);
    return Assessment;
}());
var SkillBadge = exports.SkillBadge = /** @class */ (function () {
    function SkillBadge() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], SkillBadge.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "skill_id" }),
        __metadata("design:type", Number)
    ], SkillBadge.prototype, "skillId", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["Beginner", "Intermediate", "Expert"],
            nullable: true,
        }),
        __metadata("design:type", String)
    ], SkillBadge.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true, name: "badge_image" }),
        __metadata("design:type", String)
    ], SkillBadge.prototype, "badgeImage", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "numeric",
            precision: 10,
            scale: 2,
            nullable: true,
            name: "min_score",
        }),
        __metadata("design:type", Number)
    ], SkillBadge.prototype, "minScore", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "numeric",
            precision: 10,
            scale: 2,
            nullable: true,
            name: "max_score",
        }),
        __metadata("design:type", Number)
    ], SkillBadge.prototype, "maxScore", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], SkillBadge.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "updated_at",
        }),
        __metadata("design:type", Date)
    ], SkillBadge.prototype, "updatedAt", void 0);
    SkillBadge = __decorate([
        (0, typeorm_1.Entity)({ name: "skill_badge" })
    ], SkillBadge);
    return SkillBadge;
}());
var Promotion = exports.Promotion = /** @class */ (function () {
    function Promotion() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Promotion.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], Promotion.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Promotion.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true,
            name: "promotion_type",
        }),
        __metadata("design:type", String)
    ], Promotion.prototype, "promotionType", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["Percentage", "Fixed"],
            nullable: true,
            name: "discount_type",
        }),
        __metadata("design:type", String)
    ], Promotion.prototype, "discountType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "bigint", nullable: true }),
        __metadata("design:type", Number)
    ], Promotion.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Promotion.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "product_id" }),
        __metadata("design:type", String)
    ], Promotion.prototype, "productId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true, name: "valid_from" }),
        __metadata("design:type", Date)
    ], Promotion.prototype, "validFrom", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true, name: "valid_to" }),
        __metadata("design:type", Date)
    ], Promotion.prototype, "validTo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "bigint", nullable: true, name: "min_cart_price" }),
        __metadata("design:type", Number)
    ], Promotion.prototype, "minCartPrice", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], Promotion.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "updated_at",
        }),
        __metadata("design:type", Date)
    ], Promotion.prototype, "updatedAt", void 0);
    Promotion = __decorate([
        (0, typeorm_1.Entity)({ name: "promotion" })
    ], Promotion);
    return Promotion;
}());
var Shop = exports.Shop = /** @class */ (function () {
    function Shop() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Shop.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "merchant_id" }),
        __metadata("design:type", String)
    ], Shop.prototype, "merchantId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "product_id" }),
        __metadata("design:type", String)
    ], Shop.prototype, "productId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Shop.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true, name: "policy_confirmation" }),
        __metadata("design:type", Boolean)
    ], Shop.prototype, "policyConfirmation", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["no", "temporary", "permanent"],
            default: "no",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Shop.prototype, "restricted", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["pending", "reviewed", "approved", "suspended", "blacklisted"],
            default: "pending",
            nullable: true,
            name: "admin_status",
        }),
        __metadata("design:type", String)
    ], Shop.prototype, "adminStatus", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
        __metadata("design:type", Boolean)
    ], Shop.prototype, "reviewed", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Shop.prototype, "rating", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], Shop.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "updated_at",
        }),
        __metadata("design:type", Date)
    ], Shop.prototype, "updatedAt", void 0);
    Shop = __decorate([
        (0, typeorm_1.Entity)({ name: "shop" })
    ], Shop);
    return Shop;
}());
var ProductImage = exports.ProductImage = /** @class */ (function () {
    function ProductImage() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ProductImage.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "product_id" }),
        __metadata("design:type", String)
    ], ProductImage.prototype, "productId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], ProductImage.prototype, "url", void 0);
    ProductImage = __decorate([
        (0, typeorm_1.Entity)({ name: "product_image" })
    ], ProductImage);
    return ProductImage;
}());
var Revenue = exports.Revenue = /** @class */ (function () {
    function Revenue() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Revenue.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], Revenue.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "app_id" }),
        __metadata("design:type", Number)
    ], Revenue.prototype, "appId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Revenue.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], Revenue.prototype, "createdAt", void 0);
    Revenue = __decorate([
        (0, typeorm_1.Entity)({ name: "revenue" })
    ], Revenue);
    return Revenue;
}());
var Product = exports.Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Product.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], Product.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "shop_id" }),
        __metadata("design:type", String)
    ], Product.prototype, "shopId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Product.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Product.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "bigint", nullable: true }),
        __metadata("design:type", Number)
    ], Product.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "category_id" }),
        __metadata("design:type", Number)
    ], Product.prototype, "categoryId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "image_id" }),
        __metadata("design:type", Number)
    ], Product.prototype, "imageId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Product.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "numeric",
            precision: 10,
            scale: 2,
            nullable: true,
            name: "discount_price",
        }),
        __metadata("design:type", Number)
    ], Product.prototype, "discountPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], Product.prototype, "tax", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ["pending", "reviewed", "approved", "suspended", "blacklisted"],
            default: "pending",
            nullable: true,
            name: "admin_status",
        }),
        __metadata("design:type", String)
    ], Product.prototype, "adminStatus", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "rating_id" }),
        __metadata("design:type", Number)
    ], Product.prototype, "ratingId", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            nullable: true,
            name: "is_published",
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], Product.prototype, "isPublished", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: true }),
        __metadata("design:type", String)
    ], Product.prototype, "currency", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], Product.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "updated_at",
        }),
        __metadata("design:type", Date)
    ], Product.prototype, "updatedAt", void 0);
    Product = __decorate([
        (0, typeorm_1.Entity)({ name: "product" })
    ], Product);
    return Product;
}());
var UserProductRating = exports.UserProductRating = /** @class */ (function () {
    function UserProductRating() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserProductRating.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], UserProductRating.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "product_id" }),
        __metadata("design:type", String)
    ], UserProductRating.prototype, "productId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "numeric", precision: 5, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], UserProductRating.prototype, "rating", void 0);
    UserProductRating = __decorate([
        (0, typeorm_1.Entity)({ name: "user_product_rating" })
    ], UserProductRating);
    return UserProductRating;
}());
var TrackPromotion = exports.TrackPromotion = /** @class */ (function () {
    function TrackPromotion() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], TrackPromotion.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "product_id" }),
        __metadata("design:type", String)
    ], TrackPromotion.prototype, "productId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], TrackPromotion.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "bigint", nullable: true }),
        __metadata("design:type", Number)
    ], TrackPromotion.prototype, "code", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], TrackPromotion.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], TrackPromotion.prototype, "createdAt", void 0);
    TrackPromotion = __decorate([
        (0, typeorm_1.Entity)({ name: "track_promotion" })
    ], TrackPromotion);
    return TrackPromotion;
}());
var StoreTraffic = exports.StoreTraffic = /** @class */ (function () {
    function StoreTraffic() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], StoreTraffic.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], StoreTraffic.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], StoreTraffic.prototype, "createdAt", void 0);
    StoreTraffic = __decorate([
        (0, typeorm_1.Entity)({ name: "store_traffic" })
    ], StoreTraffic);
    return StoreTraffic;
}());
var PromoProduct = exports.PromoProduct = /** @class */ (function () {
    function PromoProduct() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PromoProduct.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "product_id" }),
        __metadata("design:type", String)
    ], PromoProduct.prototype, "productId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "promo_id" }),
        __metadata("design:type", Number)
    ], PromoProduct.prototype, "promoId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], PromoProduct.prototype, "userId", void 0);
    PromoProduct = __decorate([
        (0, typeorm_1.Entity)({ name: "promo_product" })
    ], PromoProduct);
    return PromoProduct;
}());
var Activity = exports.Activity = /** @class */ (function () {
    function Activity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Activity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", String)
    ], Activity.prototype, "action", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], Activity.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Activity.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], Activity.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], Activity.prototype, "createdAt", void 0);
    Activity = __decorate([
        (0, typeorm_1.Entity)({ name: "activity" })
    ], Activity);
    return Activity;
}());
var SalesReport = exports.SalesReport = /** @class */ (function () {
    function SalesReport() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], SalesReport.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], SalesReport.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "bigint", nullable: true }),
        __metadata("design:type", Number)
    ], SalesReport.prototype, "sales", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], SalesReport.prototype, "createdAt", void 0);
    SalesReport = __decorate([
        (0, typeorm_1.Entity)({ name: "sales_report" })
    ], SalesReport);
    return SalesReport;
}());
var EmailVerification = exports.EmailVerification = /** @class */ (function () {
    function EmailVerification() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], EmailVerification.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], EmailVerification.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
        __metadata("design:type", String)
    ], EmailVerification.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], EmailVerification.prototype, "token", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true, name: "expiration_date" }),
        __metadata("design:type", Date)
    ], EmailVerification.prototype, "expirationDate", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", nullable: true, name: "created_at" }),
        __metadata("design:type", Date)
    ], EmailVerification.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", nullable: true, name: "updated_at" }),
        __metadata("design:type", Date)
    ], EmailVerification.prototype, "updatedAt", void 0);
    EmailVerification = __decorate([
        (0, typeorm_1.Entity)({ name: "email_verification" })
    ], EmailVerification);
    return EmailVerification;
}());
var Skill = exports.Skill = /** @class */ (function () {
    function Skill() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Skill.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 100,
            nullable: true,
            name: "category_name",
        }),
        __metadata("design:type", String)
    ], Skill.prototype, "categoryName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", String)
    ], Skill.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "parent_skill_id" }),
        __metadata("design:type", Number)
    ], Skill.prototype, "parentSkillId", void 0);
    Skill = __decorate([
        (0, typeorm_1.Entity)({ name: "skill" })
    ], Skill);
    return Skill;
}());
var Question = exports.Question = /** @class */ (function () {
    function Question() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Question.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "assessment_id" }),
        __metadata("design:type", Number)
    ], Question.prototype, "assessmentId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true, name: "question_text" }),
        __metadata("design:type", String)
    ], Question.prototype, "questionText", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 20,
            nullable: true,
            name: "question_type",
        }),
        __metadata("design:type", String)
    ], Question.prototype, "questionType", void 0);
    Question = __decorate([
        (0, typeorm_1.Entity)({ name: "question" })
    ], Question);
    return Question;
}());
var Answer = exports.Answer = /** @class */ (function () {
    function Answer() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Answer.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "question_id" }),
        __metadata("design:type", Number)
    ], Answer.prototype, "questionId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true, name: "answer_text" }),
        __metadata("design:type", String)
    ], Answer.prototype, "answerText", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true, name: "is_correct" }),
        __metadata("design:type", Boolean)
    ], Answer.prototype, "isCorrect", void 0);
    Answer = __decorate([
        (0, typeorm_1.Entity)({ name: "answer" })
    ], Answer);
    return Answer;
}());
var UserBadge = exports.UserBadge = /** @class */ (function () {
    function UserBadge() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserBadge.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "assessment_id" }),
        __metadata("design:type", Number)
    ], UserBadge.prototype, "assessmentId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid", nullable: true, name: "user_id" }),
        __metadata("design:type", String)
    ], UserBadge.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "badge_id" }),
        __metadata("design:type", Number)
    ], UserBadge.prototype, "badgeId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], UserBadge.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "updated_at",
        }),
        __metadata("design:type", Date)
    ], UserBadge.prototype, "updatedAt", void 0);
    UserBadge = __decorate([
        (0, typeorm_1.Entity)({ name: "user_badge" })
    ], UserBadge);
    return UserBadge;
}());
var AssessmentCategory = exports.AssessmentCategory = /** @class */ (function () {
    function AssessmentCategory() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], AssessmentCategory.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "assessment_id" }),
        __metadata("design:type", Number)
    ], AssessmentCategory.prototype, "assessmentId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, name: "skill_id" }),
        __metadata("design:type", Number)
    ], AssessmentCategory.prototype, "skillId", void 0);
    AssessmentCategory = __decorate([
        (0, typeorm_1.Entity)({ name: "assessment_category" })
    ], AssessmentCategory);
    return AssessmentCategory;
}());
var Roles = exports.Roles = /** @class */ (function () {
    function Roles() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Roles.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 225, nullable: true }),
        __metadata("design:type", String)
    ], Roles.prototype, "name", void 0);
    Roles = __decorate([
        (0, typeorm_1.Entity)({ name: "roles" })
    ], Roles);
    return Roles;
}());
var UserRoles = exports.UserRoles = /** @class */ (function () {
    function UserRoles() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserRoles.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], UserRoles.prototype, "roleId", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], UserRoles.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], UserRoles.prototype, "createdAt", void 0);
    UserRoles = __decorate([
        (0, typeorm_1.Entity)({ name: "user_roles" })
    ], UserRoles);
    return UserRoles;
}());
var Permissions = exports.Permissions = /** @class */ (function () {
    function Permissions() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Permissions.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 225 }),
        __metadata("design:type", String)
    ], Permissions.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Permissions.prototype, "createdAt", void 0);
    Permissions = __decorate([
        (0, typeorm_1.Entity)({ name: "permissions" })
    ], Permissions);
    return Permissions;
}());
var UserPermissions = exports.UserPermissions = /** @class */ (function () {
    function UserPermissions() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserPermissions.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], UserPermissions.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], UserPermissions.prototype, "permissionId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], UserPermissions.prototype, "createdAt", void 0);
    UserPermissions = __decorate([
        (0, typeorm_1.Entity)({ name: "user_permissions" })
    ], UserPermissions);
    return UserPermissions;
}());
var RolesPermissions = exports.RolesPermissions = /** @class */ (function () {
    function RolesPermissions() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], RolesPermissions.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], RolesPermissions.prototype, "roleId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], RolesPermissions.prototype, "permissionId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], RolesPermissions.prototype, "createdAt", void 0);
    RolesPermissions = __decorate([
        (0, typeorm_1.Entity)({ name: "roles_permissions" })
    ], RolesPermissions);
    return RolesPermissions;
}());
var App = exports.App = /** @class */ (function () {
    function App() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], App.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], App.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], App.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 225 }),
        __metadata("design:type", String)
    ], App.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], App.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid", { nullable: true }),
        __metadata("design:type", String)
    ], App.prototype, "createdBy", void 0);
    App = __decorate([
        (0, typeorm_1.Entity)({ name: "app" })
    ], App);
    return App;
}());
var UserAnalytics = exports.UserAnalytics = /** @class */ (function () {
    function UserAnalytics() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserAnalytics.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], UserAnalytics.prototype, "appId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int", { nullable: true }),
        __metadata("design:type", Number)
    ], UserAnalytics.prototype, "metricTotalNumberUsers", void 0);
    __decorate([
        (0, typeorm_1.Column)("int", { nullable: true }),
        __metadata("design:type", Number)
    ], UserAnalytics.prototype, "metricTotalNumberDailyUsers", void 0);
    __decorate([
        (0, typeorm_1.Column)("int", { nullable: true }),
        __metadata("design:type", Number)
    ], UserAnalytics.prototype, "metricTotalNumberOfUserVisitationOnProduct", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], UserAnalytics.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], UserAnalytics.prototype, "updatedAt", void 0);
    UserAnalytics = __decorate([
        (0, typeorm_1.Entity)({ name: "user_analytics" })
    ], UserAnalytics);
    return UserAnalytics;
}());
var SalesAnalytics = exports.SalesAnalytics = /** @class */ (function () {
    function SalesAnalytics() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], SalesAnalytics.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], SalesAnalytics.prototype, "appId", void 0);
    __decorate([
        (0, typeorm_1.Column)("numeric", { precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], SalesAnalytics.prototype, "metricAmountGoodsSold", void 0);
    __decorate([
        (0, typeorm_1.Column)("numeric", { precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], SalesAnalytics.prototype, "metricAverageSales", void 0);
    __decorate([
        (0, typeorm_1.Column)("numeric", { precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], SalesAnalytics.prototype, "metricOverallRevenue", void 0);
    __decorate([
        (0, typeorm_1.Column)("numeric", { precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], SalesAnalytics.prototype, "metricRevenuePerCategory", void 0);
    __decorate([
        (0, typeorm_1.Column)("numeric", { precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], SalesAnalytics.prototype, "metricProductPopularity", void 0);
    __decorate([
        (0, typeorm_1.Column)("int", { nullable: true }),
        __metadata("design:type", Number)
    ], SalesAnalytics.prototype, "metricTotalOrders", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], SalesAnalytics.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], SalesAnalytics.prototype, "updatedAt", void 0);
    SalesAnalytics = __decorate([
        (0, typeorm_1.Entity)({ name: "sales_analytics" })
    ], SalesAnalytics);
    return SalesAnalytics;
}());
var PortfoliosAnalytics = exports.PortfoliosAnalytics = /** @class */ (function () {
    function PortfoliosAnalytics() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], PortfoliosAnalytics.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], PortfoliosAnalytics.prototype, "appId", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { length: 225, nullable: true }),
        __metadata("design:type", String)
    ], PortfoliosAnalytics.prototype, "metricAmountPortfolios", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], PortfoliosAnalytics.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], PortfoliosAnalytics.prototype, "updatedAt", void 0);
    PortfoliosAnalytics = __decorate([
        (0, typeorm_1.Entity)({ name: "portfolios_analytics" })
    ], PortfoliosAnalytics);
    return PortfoliosAnalytics;
}());
var Report = exports.Report = /** @class */ (function () {
    function Report() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Report.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { length: 225 }),
        __metadata("design:type", String)
    ], Report.prototype, "reportType", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Report.prototype, "data", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Report.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Report.prototype, "updatedAt", void 0);
    Report = __decorate([
        (0, typeorm_1.Entity)({ name: "report" })
    ], Report);
    return Report;
}());
var Complaint = exports.Complaint = /** @class */ (function () {
    function Complaint() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Complaint.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Complaint.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Complaint.prototype, "productId", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Complaint.prototype, "complaintText", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 225, default: "pending" }),
        __metadata("design:type", String)
    ], Complaint.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Complaint.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Complaint.prototype, "updatedAt", void 0);
    Complaint = __decorate([
        (0, typeorm_1.Entity)({ name: "complaint" })
    ], Complaint);
    return Complaint;
}());
var ComplaintComment = exports.ComplaintComment = /** @class */ (function () {
    function ComplaintComment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ComplaintComment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], ComplaintComment.prototype, "complaintId", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], ComplaintComment.prototype, "comment", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], ComplaintComment.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], ComplaintComment.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], ComplaintComment.prototype, "updatedAt", void 0);
    ComplaintComment = __decorate([
        (0, typeorm_1.Entity)({ name: "complaint_comment" })
    ], ComplaintComment);
    return ComplaintComment;
}());
var MailType = exports.MailType = /** @class */ (function () {
    function MailType() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], MailType.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 225 }),
        __metadata("design:type", String)
    ], MailType.prototype, "name", void 0);
    MailType = __decorate([
        (0, typeorm_1.Entity)({ name: "mail_type" })
    ], MailType);
    return MailType;
}());
var Section = exports.Section = /** @class */ (function () {
    function Section() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Section.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], Section.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Section.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Section.prototype, "meta", void 0);
    Section = __decorate([
        (0, typeorm_1.Entity)({ name: "section" })
    ], Section);
    return Section;
}());
var Tracks = exports.Tracks = /** @class */ (function () {
    function Tracks() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Tracks.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], Tracks.prototype, "track", void 0);
    Tracks = __decorate([
        (0, typeorm_1.Entity)({ name: "tracks" })
    ], Tracks);
    return Tracks;
}());
var Images = exports.Images = /** @class */ (function () {
    function Images() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Images.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], Images.prototype, "url", void 0);
    Images = __decorate([
        (0, typeorm_1.Entity)({ name: "images" })
    ], Images);
    return Images;
}());
var WorkExperienceDetail = exports.WorkExperienceDetail = /** @class */ (function () {
    function WorkExperienceDetail() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], WorkExperienceDetail.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], WorkExperienceDetail.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], WorkExperienceDetail.prototype, "company", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], WorkExperienceDetail.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { nullable: true }),
        __metadata("design:type", String)
    ], WorkExperienceDetail.prototype, "startMonth", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { nullable: true }),
        __metadata("design:type", String)
    ], WorkExperienceDetail.prototype, "startYear", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { nullable: true }),
        __metadata("design:type", String)
    ], WorkExperienceDetail.prototype, "endMonth", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { nullable: true }),
        __metadata("design:type", String)
    ], WorkExperienceDetail.prototype, "endYear", void 0);
    __decorate([
        (0, typeorm_1.Column)("bool", { nullable: true }),
        __metadata("design:type", Boolean)
    ], WorkExperienceDetail.prototype, "isEmployee", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], WorkExperienceDetail.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], WorkExperienceDetail.prototype, "sectionId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], WorkExperienceDetail.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], WorkExperienceDetail.prototype, "updatedAt", void 0);
    WorkExperienceDetail = __decorate([
        (0, typeorm_1.Entity)({ name: "work_experience_detail" })
    ], WorkExperienceDetail);
    return WorkExperienceDetail;
}());
var Project = exports.Project = /** @class */ (function () {
    function Project() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Project.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], Project.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], Project.prototype, "year", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { nullable: true }),
        __metadata("design:type", String)
    ], Project.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Project.prototype, "tags", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], Project.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)("int", { nullable: true }),
        __metadata("design:type", Number)
    ], Project.prototype, "thumbnail", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Project.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], Project.prototype, "sectionId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Project.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Project.prototype, "updatedAt", void 0);
    Project = __decorate([
        (0, typeorm_1.Entity)({ name: "project" })
    ], Project);
    return Project;
}());
var EducationDetail = exports.EducationDetail = /** @class */ (function () {
    function EducationDetail() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], EducationDetail.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], EducationDetail.prototype, "degreeId", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], EducationDetail.prototype, "fieldOfStudy", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], EducationDetail.prototype, "school", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], EducationDetail.prototype, "from", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], EducationDetail.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], EducationDetail.prototype, "to", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], EducationDetail.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], EducationDetail.prototype, "sectionId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], EducationDetail.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], EducationDetail.prototype, "updatedAt", void 0);
    EducationDetail = __decorate([
        (0, typeorm_1.Entity)({ name: "education_detail" })
    ], EducationDetail);
    return EducationDetail;
}());
var Degree = exports.Degree = /** @class */ (function () {
    function Degree() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Degree.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], Degree.prototype, "type", void 0);
    Degree = __decorate([
        (0, typeorm_1.Entity)({ name: "degree" })
    ], Degree);
    return Degree;
}());
var AboutDetail = exports.AboutDetail = /** @class */ (function () {
    function AboutDetail() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], AboutDetail.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], AboutDetail.prototype, "bio", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], AboutDetail.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], AboutDetail.prototype, "sectionId", void 0);
    AboutDetail = __decorate([
        (0, typeorm_1.Entity)({ name: "about_detail" })
    ], AboutDetail);
    return AboutDetail;
}());
var SkillsDetail = exports.SkillsDetail = /** @class */ (function () {
    function SkillsDetail() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], SkillsDetail.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], SkillsDetail.prototype, "skills", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], SkillsDetail.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], SkillsDetail.prototype, "sectionId", void 0);
    SkillsDetail = __decorate([
        (0, typeorm_1.Entity)({ name: "skills_detail" })
    ], SkillsDetail);
    return SkillsDetail;
}());
var InterestDetail = exports.InterestDetail = /** @class */ (function () {
    function InterestDetail() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], InterestDetail.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], InterestDetail.prototype, "interest", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], InterestDetail.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], InterestDetail.prototype, "sectionId", void 0);
    InterestDetail = __decorate([
        (0, typeorm_1.Entity)({ name: "interest_detail" })
    ], InterestDetail);
    return InterestDetail;
}());
var SocialMedia = exports.SocialMedia = /** @class */ (function () {
    function SocialMedia() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], SocialMedia.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], SocialMedia.prototype, "name", void 0);
    SocialMedia = __decorate([
        (0, typeorm_1.Entity)({ name: "social_media" })
    ], SocialMedia);
    return SocialMedia;
}());
var SocialUser = exports.SocialUser = /** @class */ (function () {
    function SocialUser() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], SocialUser.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], SocialUser.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], SocialUser.prototype, "socialMediaId", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], SocialUser.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.socialUsers; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "user_id" }),
        __metadata("design:type", user_1.User)
    ], SocialUser.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return SocialMedia; }, function (socialMedia) { return socialMedia.id; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)({ name: "social_media_id" }),
        __metadata("design:type", SocialMedia)
    ], SocialUser.prototype, "socialMedia", void 0);
    SocialUser = __decorate([
        (0, typeorm_1.Entity)({ name: "social_user" })
    ], SocialUser);
    return SocialUser;
}());
var CustomUserSection = exports.CustomUserSection = /** @class */ (function () {
    function CustomUserSection() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], CustomUserSection.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], CustomUserSection.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], CustomUserSection.prototype, "sectionId", void 0);
    CustomUserSection = __decorate([
        (0, typeorm_1.Entity)({ name: "custom_user_section" })
    ], CustomUserSection);
    return CustomUserSection;
}());
var CustomField = exports.CustomField = /** @class */ (function () {
    function CustomField() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], CustomField.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], CustomField.prototype, "fieldType", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar"),
        __metadata("design:type", String)
    ], CustomField.prototype, "fieldName", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], CustomField.prototype, "customSectionId", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { nullable: true }),
        __metadata("design:type", String)
    ], CustomField.prototype, "value", void 0);
    CustomField = __decorate([
        (0, typeorm_1.Entity)({ name: "custom_field" })
    ], CustomField);
    return CustomField;
}());
var NotificationSetting = exports.NotificationSetting = /** @class */ (function () {
    function NotificationSetting() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], NotificationSetting.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("bool", { nullable: true }),
        __metadata("design:type", Boolean)
    ], NotificationSetting.prototype, "emailSummary", void 0);
    __decorate([
        (0, typeorm_1.Column)("bool", { nullable: true }),
        __metadata("design:type", Boolean)
    ], NotificationSetting.prototype, "specialOffers", void 0);
    __decorate([
        (0, typeorm_1.Column)("bool", { nullable: true }),
        __metadata("design:type", Boolean)
    ], NotificationSetting.prototype, "communityUpdate", void 0);
    __decorate([
        (0, typeorm_1.Column)("bool", { nullable: true }),
        __metadata("design:type", Boolean)
    ], NotificationSetting.prototype, "followUpdate", void 0);
    __decorate([
        (0, typeorm_1.Column)("bool", { nullable: true }),
        __metadata("design:type", Boolean)
    ], NotificationSetting.prototype, "newMessages", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], NotificationSetting.prototype, "userId", void 0);
    NotificationSetting = __decorate([
        (0, typeorm_1.Entity)({ name: "notification_setting" })
    ], NotificationSetting);
    return NotificationSetting;
}());
var ProjectsImage = exports.ProjectsImage = /** @class */ (function () {
    function ProjectsImage() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", Number)
    ], ProjectsImage.prototype, "projectId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], ProjectsImage.prototype, "imageId", void 0);
    ProjectsImage = __decorate([
        (0, typeorm_1.Entity)({ name: "projects_image" })
    ], ProjectsImage);
    return ProjectsImage;
}());
var Cart = exports.Cart = /** @class */ (function () {
    function Cart() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)("uuid"),
        __metadata("design:type", String)
    ], Cart.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Cart.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Cart.prototype, "productId", void 0);
    Cart = __decorate([
        (0, typeorm_1.Entity)({ name: "cart" })
    ], Cart);
    return Cart;
}());
var OrderItem = exports.OrderItem = /** @class */ (function () {
    function OrderItem() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], OrderItem.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], OrderItem.prototype, "orderId", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], OrderItem.prototype, "productId", void 0);
    OrderItem = __decorate([
        (0, typeorm_1.Entity)({ name: "order_item" })
    ], OrderItem);
    return OrderItem;
}());
var ProductReview = exports.ProductReview = /** @class */ (function () {
    function ProductReview() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ProductReview.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], ProductReview.prototype, "productId", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], ProductReview.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], ProductReview.prototype, "comment", void 0);
    __decorate([
        (0, typeorm_1.Column)("int", { nullable: true }),
        __metadata("design:type", Number)
    ], ProductReview.prototype, "replyId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], ProductReview.prototype, "createdAt", void 0);
    ProductReview = __decorate([
        (0, typeorm_1.Entity)({ name: "product_review" })
    ], ProductReview);
    return ProductReview;
}());
var Coupon = exports.Coupon = /** @class */ (function () {
    function Coupon() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Coupon.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Coupon.prototype, "merchantId", void 0);
    __decorate([
        (0, typeorm_1.Column)("uuid"),
        __metadata("design:type", String)
    ], Coupon.prototype, "shopId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], Coupon.prototype, "transactionId", void 0);
    __decorate([
        (0, typeorm_1.Column)("int"),
        __metadata("design:type", Number)
    ], Coupon.prototype, "couponLimit", void 0);
    __decorate([
        (0, typeorm_1.Column)("numeric", { precision: 10, scale: 2 }),
        __metadata("design:type", Number)
    ], Coupon.prototype, "percentage", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { length: 20 }),
        __metadata("design:type", String)
    ], Coupon.prototype, "couponCode", void 0);
    __decorate([
        (0, typeorm_1.Column)("timestamp", { default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Coupon.prototype, "expiryDate", void 0);
    Coupon = __decorate([
        (0, typeorm_1.Entity)({ name: "coupon" })
    ], Coupon);
    return Coupon;
}());
//# sourceMappingURL=model.js.map