import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user";

enum STATUS {
  PENDING = "pending",
  COMPLETE = "complete",
  FAILED = "failed",
}

enum ADMIN_STATUS {
  PENDING = "pending",
  REVIEW = "reviewed",
  APPROVED = "approved",
  BLACKLIST = "blacklisted",
}

enum BADGES {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  EXPERT = "Expert",
}

enum DISCOUNT_TYPE {
  PERCENTAGE = "Percentage",
  FIXED = "Fixed",
}

enum RESTRICTED {
  NO = "no",
  TEMPORARY = "temporary",
  PERMANENT = "permanent",
}

@Entity({ name: "mail_log" })
export class MailLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 225, nullable: true })
  email: string;

  @Column({ type: "json", nullable: true })
  messageData: any;

  @Column({ type: "int", nullable: true, name: "message_type_id" })
  messageType: number;

  @Column({
    type: "enum",
    enum: ["pending", "complete", "failed"],
    default: "pending",
    nullable: true,
  })
  status: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;

  @Column({
    type: "varchar",
    length: 225,
    nullable: true,
    name: "request_origin",
  })
  requestOrigin: string;
}
@Entity({ name: "user_track" })
export class UserTrack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  userId: string;

  @Column("int")
  trackId: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Tracks, (track) => track.id)
  track: Tracks;
}
@Entity({ name: "portfolio_details" })
export class PortfolioDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  city: string;

  @Column("varchar", { nullable: true })
  country: string;

  @Column("varchar")
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
@Entity({ name: "user_assessment_progress" })
export class UserAssessmentProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true, name: "user_assessment_id" })
  userAssessmentId: number;

  @Column({ type: "int", nullable: true, name: "question_id" })
  questionId: number;

  @Column({
    type: "enum",
    enum: ["pending", "complete", "failed"],
    default: "pending",
    nullable: true,
  })
  status: string;
}
@Entity({ name: "user_assessment" })
export class UserAssessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @Column({ type: "int", nullable: true, name: "assessment_id" })
  assessmentId: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  score: number;

  @Column({
    type: "enum",
    enum: ["pending", "complete", "failed"],
    default: "pending",
    nullable: true,
  })
  status: string;

  @Column({ type: "timestamp", nullable: true, name: "submission_date" })
  submissionDate: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;
}
@Entity({ name: "transaction" })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "order_id" })
  orderId: string;

  @Column({ type: "int", nullable: true, name: "app_id" })
  appId: number;

  @Column({
    type: "enum",
    enum: ["pending", "complete", "failed"],
    default: "pending",
    nullable: true,
  })
  status: string;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  currency: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    name: "provider_ref",
  })
  providerRef: string;

  @Column({ type: "varchar", length: 255, nullable: true, name: "in_app_ref" })
  inAppRef: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  provider: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;
}
@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  type: string;

  @Column({ type: "bigint", nullable: true })
  quantity: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: true,
    name: "subtotal",
  })
  VAT: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: true,
    name: "VAT",
  })
  subtotal: number;

  @Column({ type: "uuid", nullable: true, name: "product_id" })
  productId: string;

  @Column({ type: "uuid", nullable: true, name: "merchant_id" })
  merchantId: string;

  @Column({ type: "uuid", nullable: true, name: "customer_id" })
  customerId: string;

  @Column({ type: "int", nullable: true, name: "promo" })
  promo: number;

  @Column({
    type: "enum",
    enum: ["pending", "complete", "failed"],
    default: "pending",
    nullable: true,
  })
  status: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;
}
@Entity({ name: "product_category" })
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 225, nullable: true })
  name: string;

  @Column({ type: "int", nullable: true, name: "parent_category_id" })
  parentCategoryId: number;

  @Column({
    type: "enum",
    enum: ["pending", "complete", "failed"],
    default: "pending",
    nullable: true,
  })
  status: string;
}
@Entity({ name: "assessment" })
export class Assessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true, name: "skill_id" })
  skillId: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "timestamp", nullable: true, name: "start_date" })
  startDate: Date;

  @Column({ type: "timestamp", nullable: true, name: "end_date" })
  endDate: Date;

  @Column({ type: "int", nullable: true, name: "duration_minutes" })
  durationMinutes: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: true,
    name: "pass_score",
  })
  passScore: number;

  @Column({
    type: "enum",
    enum: ["pending", "complete", "failed"],
    default: "pending",
    nullable: true,
  })
  status: string;
}
@Entity({ name: "skill_badge" })
export class SkillBadge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true, name: "skill_id" })
  skillId: number;

  @Column({
    type: "enum",
    enum: ["Beginner", "Intermediate", "Expert"],
    nullable: true,
  })
  name: string;

  @Column({ type: "text", nullable: true, name: "badge_image" })
  badgeImage: string;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: true,
    name: "min_score",
  })
  minScore: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: true,
    name: "max_score",
  })
  maxScore: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;
}
@Entity({ name: "promotion" })
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  code: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    name: "promotion_type",
  })
  promotionType: string;

  @Column({
    type: "enum",
    enum: ["Percentage", "Fixed"],
    nullable: true,
    name: "discount_type",
  })
  discountType: string;

  @Column({ type: "bigint", nullable: true })
  quantity: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ type: "uuid", nullable: true, name: "product_id" })
  productId: string;

  @Column({ type: "timestamp", nullable: true, name: "valid_from" })
  validFrom: Date;

  @Column({ type: "timestamp", nullable: true, name: "valid_to" })
  validTo: Date;

  @Column({ type: "bigint", nullable: true, name: "min_cart_price" })
  minCartPrice: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;
}

@Entity({ name: "shop" })
export class Shop {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", nullable: true, name: "merchant_id" })
  merchantId: string;

  @Column({ type: "uuid", nullable: true, name: "product_id" })
  productId: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  name: string;

  @Column({ type: "boolean", nullable: true, name: "policy_confirmation" })
  policyConfirmation: boolean;

  @Column({
    type: "enum",
    enum: ["no", "temporary", "permanent"],
    default: "no",
    nullable: true,
  })
  restricted: string;

  @Column({
    type: "enum",
    enum: ["pending", "reviewed", "approved", "suspended", "blacklisted"],
    default: "pending",
    nullable: true,
    name: "admin_status",
  })
  adminStatus: string;

  @Column({ type: "boolean", nullable: true })
  reviewed: boolean;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  rating: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;
}
@Entity({ name: "product_image" })
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "product_id" })
  productId: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  url: string;
}
@Entity({ name: "revenue" })
export class Revenue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @Column({ type: "int", nullable: true, name: "app_id" })
  appId: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  amount: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;
}
@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @Column({ type: "uuid", nullable: true, name: "shop_id" })
  shopId: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @Column({ type: "bigint", nullable: true })
  quantity: number;

  @Column({ type: "int", nullable: true, name: "category_id" })
  categoryId: number;

  @Column({ type: "int", nullable: true, name: "image_id" })
  imageId: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: true,
    name: "discount_price",
  })
  discountPrice: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  tax: number;

  @Column({
    type: "enum",
    enum: ["pending", "reviewed", "approved", "suspended", "blacklisted"],
    default: "pending",
    nullable: true,
    name: "admin_status",
  })
  adminStatus: string;

  @Column({ type: "int", nullable: true, name: "rating_id" })
  ratingId: number;

  @Column({
    type: "boolean",
    nullable: true,
    name: "is_published",
    default: false,
  })
  isPublished: boolean;

  @Column({ type: "varchar", length: 10, nullable: true })
  currency: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;
}
@Entity({ name: "user_product_rating" })
export class UserProductRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @Column({ type: "uuid", nullable: true, name: "product_id" })
  productId: string;

  @Column({ type: "numeric", precision: 5, scale: 2, nullable: true })
  rating: number;
}
@Entity({ name: "track_promotion" })
export class TrackPromotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "product_id" })
  productId: string;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @Column({ type: "bigint", nullable: true })
  code: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  type: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;
}
@Entity({ name: "store_traffic" })
export class StoreTraffic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;
}

@Entity({ name: "promo_product" })
export class PromoProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "product_id" })
  productId: string;

  @Column({ type: "int", nullable: true, name: "promo_id" })
  promoId: number;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;
}
@Entity({ name: "activity" })
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  action: string;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  title: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;
}
@Entity({ name: "sales_report" })
export class SalesReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @Column({ type: "bigint", nullable: true })
  sales: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;
}
@Entity({ name: "email_verification" })
export class EmailVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  token: string;

  @Column({ type: "timestamp", nullable: true, name: "expiration_date" })
  expirationDate: Date;

  @CreateDateColumn({ type: "timestamp", nullable: true, name: "created_at" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp", nullable: true, name: "updated_at" })
  updatedAt: Date;
}
@Entity({ name: "skill" })
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
    name: "category_name",
  })
  categoryName: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "int", nullable: true, name: "parent_skill_id" })
  parentSkillId: number;
}
@Entity({ name: "question" })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true, name: "assessment_id" })
  assessmentId: number;

  @Column({ type: "text", nullable: true, name: "question_text" })
  questionText: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
    name: "question_type",
  })
  questionType: string;
}

@Entity({ name: "answer" })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true, name: "question_id" })
  questionId: number;

  @Column({ type: "text", nullable: true, name: "answer_text" })
  answerText: string;

  @Column({ type: "boolean", nullable: true, name: "is_correct" })
  isCorrect: boolean;
}
@Entity({ name: "user_badge" })
export class UserBadge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true, name: "assessment_id" })
  assessmentId: number;

  @Column({ type: "uuid", nullable: true, name: "user_id" })
  userId: string;

  @Column({ type: "int", nullable: true, name: "badge_id" })
  badgeId: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;
}

@Entity({ name: "assessment_category" })
export class AssessmentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true, name: "assessment_id" })
  assessmentId: number;

  @Column({ type: "int", nullable: true, name: "skill_id" })
  skillId: number;
}

@Entity({ name: "roles" })
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 225, nullable: true })
  name: string;
}

@Entity({ name: "user_roles" })
export class UserRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  roleId: number;

  @Column("uuid")
  userId: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}

@Entity({ name: "permissions" })
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 225 })
  name: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
@Entity({ name: "user_permissions" })
export class UserPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  userId: string;

  @Column("int")
  permissionId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
@Entity({ name: "roles_permissions" })
export class RolesPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  roleId: number;

  @Column("int")
  permissionId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
@Entity({ name: "app" })
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  url: string;

  @Column("text", { nullable: true })
  description: string;

  @Column({ type: "varchar", length: 225 })
  name: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("uuid", { nullable: true })
  createdBy: string;
}

@Entity({ name: "user_analytics" })
export class UserAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  appId: number;

  @Column("int", { nullable: true })
  metricTotalNumberUsers: number;

  @Column("int", { nullable: true })
  metricTotalNumberDailyUsers: number;

  @Column("int", { nullable: true })
  metricTotalNumberOfUserVisitationOnProduct: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}

@Entity({ name: "sales_analytics" })
export class SalesAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  appId: number;

  @Column("numeric", { precision: 10, scale: 2, nullable: true })
  metricAmountGoodsSold: number;

  @Column("numeric", { precision: 10, scale: 2, nullable: true })
  metricAverageSales: number;

  @Column("numeric", { precision: 10, scale: 2, nullable: true })
  metricOverallRevenue: number;

  @Column("numeric", { precision: 10, scale: 2, nullable: true })
  metricRevenuePerCategory: number;

  @Column("numeric", { precision: 10, scale: 2, nullable: true })
  metricProductPopularity: number;

  @Column("int", { nullable: true })
  metricTotalOrders: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
@Entity({ name: "portfolios_analytics" })
export class PortfoliosAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  appId: number;

  @Column("varchar", { length: 225, nullable: true })
  metricAmountPortfolios: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}

@Entity({ name: "report" })
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 225 })
  reportType: string;

  @Column("text", { nullable: true })
  data: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}

@Entity({ name: "complaint" })
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  userId: string;

  @Column("uuid")
  productId: string;

  @Column("text")
  complaintText: string;

  @Column({ type: "varchar", length: 225, default: "pending" })
  status: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}

@Entity({ name: "complaint_comment" })
export class ComplaintComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  complaintId: number;

  @Column("text")
  comment: string;

  @Column("uuid")
  userId: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}

@Entity({ name: "mail_type" })
export class MailType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 225 })
  name: string;
}

@Entity({ name: "section" })
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("text", { nullable: true })
  meta: string;
}

@Entity({ name: "tracks" })
export class Tracks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  track: string;
}

@Entity({ name: "images" })
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  url: string;
}

@Entity({ name: "work_experience_detail" })
export class WorkExperienceDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  role: string;

  @Column("varchar")
  company: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("varchar", { nullable: true })
  startMonth: string;

  @Column("varchar", { nullable: true })
  startYear: string;

  @Column("varchar", { nullable: true })
  endMonth: string;

  @Column("varchar", { nullable: true })
  endYear: string;

  @Column("bool", { nullable: true })
  isEmployee: boolean;

  @Column("uuid")
  userId: string;

  @Column("int")
  sectionId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}

@Entity({ name: "project" })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;

  @Column("varchar")
  year: string;

  @Column("varchar", { nullable: true })
  url: string;

  @Column("text", { nullable: true })
  tags: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("int", { nullable: true })
  thumbnail: number;

  @Column("uuid")
  userId: string;

  @Column("int")
  sectionId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
@Entity({ name: "education_detail" })
export class EducationDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  degreeId: number;

  @Column("varchar")
  fieldOfStudy: string;
ield
  @Column("varchar")
  school: string;

  @Column("varchar")
  from: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("varchar")
  to: string;

  @Column("uuid")
  userId: string;

  @Column("int")
  sectionId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}

@Entity({ name: "degree" })
export class Degree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  type: string;
}
@Entity({ name: "about_detail" })
export class AboutDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  bio: string;

  @Column("uuid")
  userId: string;

  @Column("int")
  sectionId: number;
}

@Entity({ name: "skills_detail" })
export class SkillsDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  skills: string;

  @Column("uuid")
  userId: string;

  @Column("int")
  sectionId: number;
}

@Entity({ name: "interest_detail" })
export class InterestDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  interest: string;

  @Column("uuid")
  userId: string;

  @Column("int")
  sectionId: number;
}

@Entity({ name: "social_media" })
export class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;
}

@Entity({ name: "social_user" })
export class SocialUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  userId: string;

  @Column("int")
  socialMediaId: number;

  @Column("text")
  url: string;

  @ManyToOne(() => User, (user) => user.socialUsers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => SocialMedia, (socialMedia) => socialMedia.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "social_media_id" })
  socialMedia: SocialMedia;
}

@Entity({ name: "custom_user_section" })
export class CustomUserSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  userId: string;

  @Column("int")
  sectionId: number;
}

@Entity({ name: "custom_field" })
export class CustomField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  fieldType: string;

  @Column("varchar")
  fieldName: string;

  @Column("int")
  customSectionId: number;

  @Column("text", { nullable: true })
  value: string;
}

@Entity({ name: "notification_setting" })
export class NotificationSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("bool", { nullable: true })
  emailSummary: boolean;

  @Column("bool", { nullable: true })
  specialOffers: boolean;

  @Column("bool", { nullable: true })
  communityUpdate: boolean;

  @Column("bool", { nullable: true })
  followUpdate: boolean;

  @Column("bool", { nullable: true })
  newMessages: boolean;

  @Column("uuid")
  userId: string;
}

@Entity({ name: "projects_image" })
export class ProjectsImage {
  @PrimaryColumn()
  projectId: number;

  @Column("int")
  imageId: number;
}
@Entity({ name: "cart" })
export class Cart {
  @PrimaryColumn("uuid")
  id: string;

  @Column("uuid")
  userId: string;

  @Column("uuid")
  productId: string;
}

@Entity({ name: "order_item" })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  orderId: string;

  @Column("uuid")
  productId: string;
}
@Entity({ name: "product_review" })
export class ProductReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  productId: string;

  @Column("uuid")
  userId: string;

  @Column("text")
  comment: string;

  @Column("int", { nullable: true })
  replyId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
@Entity({ name: "coupon" })
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  merchantId: string;

  @Column("uuid")
  shopId: string;

  @Column("int")
  transactionId: number;

  @Column("int")
  couponLimit: number;

  @Column("numeric", { precision: 10, scale: 2 })
  percentage: number;

  @Column("varchar", { length: 20 })
  couponCode: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  expiryDate: Date;
}
