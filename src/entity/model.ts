import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

// Define ENUMs
enum STATUS {
  PENDING = "pending",
  COMPLETE = "complete",
  FAILED = "failed",
}

enum ADMIN_STATUS {
  PENDING = "pending",
  REVIEW = "review",
  APPROVED = "approved",
  BLACKLIST = "blacklist",
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
  messageData: JSON;

  @Column({ type: "int", nullable: true })
  messageType: number;

  @Column({ type: "enum", enum: STATUS, default: STATUS.PENDING })
  status: STATUS;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "varchar", length: 225, nullable: true })
  requestOrigin: string;
}

@Entity({ name: "user_assessment_progress" })
export class UserAssessmentProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  userAssessmentId: number;

  @Column({ type: "int", nullable: true })
  questionId: number;

  @Column({ type: "enum", enum: STATUS, default: STATUS.PENDING })
  status: STATUS;
}

@Entity({ name: "user_assessment" })
export class UserAssessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  assessmentId: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  score: number;

  @Column({ type: "enum", enum: STATUS, default: STATUS.PENDING })
  status: STATUS;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  submissionDate: Date;
}

@Entity({ name: "shop" })
export class Shop {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { nullable: true })
  merchantId: string;

  @Column("uuid", { nullable: true })
  productId: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  name: string;

  @Column({ type: "boolean", default: false })
  policyConfirmation: boolean;

  @Column({ type: "enum", enum: RESTRICTED, default: RESTRICTED.NO })
  restricted: RESTRICTED;

  @Column({ type: "enum", enum: ADMIN_STATUS, default: ADMIN_STATUS.PENDING })
  adminStatus: ADMIN_STATUS;

  @Column({ type: "boolean", default: false })
  reviewed: boolean;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  rating: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

@Entity({ name: "product_image" })
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { nullable: true })
  productId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  url: string;
}

@Entity({ name: "revenue" })
export class Revenue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  appId: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
  amount: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column("uuid", { nullable: true })
  shopId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  description: string;

  @Column({ type: "bigint", nullable: false })
  quantity: number;

  @Column({ type: "int", nullable: true })
  category: number;

  @Column({ type: "int", nullable: true })
  imageId: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
  discountPrice: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
  tax: number;

  @Column({ type: "enum", enum: ADMIN_STATUS, default: ADMIN_STATUS.PENDING })
  adminStatus: ADMIN_STATUS;

  @Column({ type: "int", nullable: true })
  ratingId: number;

  @Column({ type: "boolean", default: false })
  isPublished: boolean;

  @Column({ type: "varchar", length: 10, nullable: false })
  currency: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

@Entity({ name: "question" })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  assessmentId: number;

  @Column({ type: "text", nullable: true })
  questionText: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  questionType: string;
}

@Entity({ name: "answer" })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  questionId: number;

  @Column({ type: "text", nullable: true })
  answerText: string;

  @Column({ type: "boolean", nullable: true })
  isCorrect: boolean;
}

@Entity({ name: "user_response" })
export class UserResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  userAssessmentId: number;

  @Column({ type: "int", nullable: true })
  questionId: number;

  @Column({ type: "text", nullable: true })
  responseText: string;

  @Column({ type: "boolean", nullable: true })
  isCorrect: boolean;
}

@Entity({ name: "assessment_category" })
export class AssessmentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  assessmentId: number;

  @Column({ type: "int", nullable: true })
  skillId: number;
}

@Entity({ name: "user_badge" })
export class UserBadge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  assessmentId: number;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  badgeId: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt: Date;
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

  @Column({ type: "int", nullable: true })
  roleId: number;

  @Column("uuid", { nullable: true })
  userId: string;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;
}

@Entity({ name: "permissions" })
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 225, nullable: true })
  name: string;
}

@Entity({ name: "user_permissions" })
export class UserPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  permissionId: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;
}

@Entity({ name: "roles_permissions" })
export class RolesPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  roleId: number;

  @Column({ type: "int", nullable: true })
  permissionId: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;
}

@Entity({ name: "app" })
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  url: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", length: 225, nullable: true })
  name: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column("uuid", { nullable: true })
  createdBy: string;
}

@Entity({ name: "user_analytics" })
export class UserAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  appId: number;

  @Column({ type: "timestamp", nullable: true })
  timestamp: Date;

  @Column({ type: "varchar", length: 225, nullable: true })
  metricTotalNumberUser: string;

  @Column({ type: "varchar", length: 225, nullable: true })
  metricTotalNumberDailyUser: string;
}

@Entity({ name: "sales_analytics" })
export class SalesAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  appId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;

  @Column({ type: "varchar", length: 225, nullable: true })
  metricAmountGoodsSold: string;

  @Column({ type: "varchar", length: 225, nullable: true })
  metricAverageSales: string;

  @Column({ type: "varchar", length: 225, nullable: true })
  metricOverallRevenue: string;

  @Column({ type: "varchar", length: 225, nullable: true })
  metricRevenuePerCategory: string;

  @Column({ type: "varchar", length: 225, nullable: true })
  metricProductPopularity: string;
}

@Entity({ name: "portfolios_analytics" })
export class PortfoliosAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  appId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;

  @Column({ type: "varchar", length: 225, nullable: true })
  metricAmountPortfolios: string;
}

@Entity({ name: "report" })
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 225, nullable: true })
  reportType: string;

  @Column({ type: "text", nullable: true })
  data: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}

@Entity({ name: "mail_type" })
export class MailType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 225, nullable: true })
  name: string;
}

@Entity({ name: "section" })
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text", nullable: true })
  meta: string;
}

@Entity({ name: "tracks" })
export class Tracks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  track: string;
}

@Entity({ name: "images" })
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  url: string;
}

@Entity({ name: "work_experience_detail" })
export class WorkExperienceDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  role: string;

  @Column({ type: "varchar", nullable: true })
  company: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", nullable: true })
  startMonth: string;

  @Column({ type: "varchar", nullable: true })
  startYear: string;

  @Column({ type: "varchar", nullable: true })
  endMonth: string;

  @Column({ type: "varchar", nullable: true })
  endYear: string;

  @Column({ type: "boolean", nullable: true })
  isEmployee: boolean;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  sectionId: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;
}

@Entity({ name: "project" })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  title: string;

  @Column({ type: "varchar", nullable: true })
  year: string;

  @Column({ type: "varchar", nullable: true })
  url: string;

  @Column({ type: "text", nullable: true })
  tags: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "int", nullable: true })
  thumbnail: number;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  sectionId: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;
}

@Entity({ name: "education_detail" })
export class EducationDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  degreeId: number;

  @Column({ type: "varchar", nullable: true })
  fieldOfStudy: string;

  @Column({ type: "varchar", nullable: true })
  school: string;

  @Column({ type: "varchar", nullable: true })
  from: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", nullable: true })
  to: string;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  sectionId: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;
}

@Entity({ name: "degree" })
export class Degree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  type: string;
}

@Entity({ name: "about_detail" })
export class AboutDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  sectionId: number;
}

@Entity({ name: "skills_detail" })
export class SkillsDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  skills: string;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  sectionId: number;
}

@Entity({ name: "interest_detail" })
export class InterestDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  interest: string;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  sectionId: number;
}

@Entity({ name: "social_media" })
export class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  name: string;
}

@Entity({ name: "social_user" })
export class SocialUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  socialMediaId: number;

  @Column({ type: "text", nullable: true })
  url: string;
}

@Entity({ name: "custom_user_section" })
export class CustomUserSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "int", nullable: true })
  sectionId: number;
}

@Entity({ name: "custom_field" })
export class CustomField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  fieldType: string;

  @Column({ type: "varchar", nullable: true })
  fieldName: string;

  @Column({ type: "int", nullable: true })
  customSectionId: number;

  @Column({ type: "text", nullable: true })
  value: string;
}

@Entity({ name: "notification_setting" })
export class NotificationSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean", nullable: true })
  emailSummary: boolean;

  @Column({ type: "boolean", nullable: true })
  specialOffers: boolean;

  @Column({ type: "boolean", nullable: true })
  communityUpdate: boolean;

  @Column({ type: "boolean", nullable: true })
  followUpdate: boolean;

  @Column({ type: "boolean", nullable: true })
  newMessages: boolean;

  @Column("uuid", { nullable: true })
  userId: string;
}

@Entity({ name: "projects_image" })
export class ProjectsImage {
  @Column({ type: "int", nullable: true, primary: true })
  projectId: number;

  @Column({ type: "int", nullable: true, primary: true })
  imageId: number;
}

@Entity({ name: "cart" })
export class Cart {
  @PrimaryColumn("uuid")
  id: string;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column("uuid", { nullable: true })
  productId: string;
}

@Entity({ name: "order_item" })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { nullable: true })
  orderId: string;

  @Column("uuid", { nullable: true })
  productId: string;
}

@Entity({ name: "product_review" })
export class ProductReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { nullable: true })
  productId: string;

  @Column("uuid", { nullable: true })
  userId: string;

  @Column({ type: "text", nullable: true })
  comment: string;

  @Column({ type: "int", nullable: true })
  replyId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}

@Entity({ name: "coupon" })
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid", { nullable: true })
  merchantId: string;

  @Column("uuid", { nullable: true })
  shopId: string;

  @Column({ type: "int", nullable: true })
  transactionId: number;

  @Column({ type: "int", nullable: true })
  couponLimit: number;

  @Column({ type: "numeric", precision: 10, scale: 2, nullable: true })
  percentage: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  couponCode: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  expiryDate: Date;
}
