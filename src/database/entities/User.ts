import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import {
  AboutDetail,
  Award,
  Certificate,
  CustomField,
  CustomUserSection,
  Degree,
  EducationDetail,
  Images,
  InterestDetail,
  PortfolioDetail,
  Project,
  ProjectsImage,
  NotificationSetting,
  Section,
  Skill,
  SkillsDetail,
  SocialMedia,
  SocialUser,
  Tracks,
  UserTrack,
  WorkExperienceDetail,
} from "./index";
import { LanguageDetail } from "./LanguageDetail";
import { ReferenceDetail } from "./Reference";

@Index("user_pkey", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "username", length: 255 })
  username: string;

  @Column("character varying", { name: "first_name", length: 255 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 255 })
  lastName: string;

  @Column("character varying", { name: "email", length: 255 })
  email: string;

  @Column("text", { name: "section_order", nullable: true })
  sectionOrder: string | null;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column("character varying", {
    name: "provider",
    nullable: true,
    length: 255,
  })
  provider: string | null;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 255,
  })
  phoneNumber: string | null;

  @Column("boolean", {
    name: "is_verified",
    nullable: true,
    default: () => "false",
  })
  isVerified: boolean | null;

  @Column("boolean", {
    name: "two_factor_auth",
    nullable: true,
    default: () => "false",
  })
  twoFactorAuth: boolean | null;

  @Column("character varying", {
    name: "location",
    nullable: true,
    length: 255,
  })
  location: string | null;

  @Column("character varying", { name: "country", nullable: true, length: 255 })
  country: string | null;

  @Column("character varying", { name: "slug", length: 255, nullable: true })
  slug: string;

  @Column("text", { name: "profile_pic", nullable: true })
  profilePic: string | null;

  @Column("text", { name: "profile_cover_photo", nullable: true })
  profileCoverPhoto: string | null;

  @Column("character varying", {
    name: "refresh_token",
    nullable: true,
    length: 255,
  })
  refreshToken: string | null;

  @Column("timestamp without time zone", {
    name: "createdAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => AboutDetail, (aboutDetail) => aboutDetail.user)
  aboutDetails: AboutDetail[];

  @OneToMany(() => Award, (award) => award.user)
  awards: Award[];

  @OneToMany(() => Certificate, (certificate) => certificate.user)
  certificates: Certificate[];

  @OneToMany(
    () => CustomUserSection,
    (customUserSection) => customUserSection.user
  )
  customUserSections: CustomUserSection[];

  @OneToMany(() => EducationDetail, (educationDetail) => educationDetail.user)
  educationDetails: EducationDetail[];

  @OneToMany(() => InterestDetail, (interestDetail) => interestDetail.user)
  interestDetails: InterestDetail[];

  @OneToMany(
    () => NotificationSetting,
    (notificationSetting) => notificationSetting.user
  )
  notificationSettings: NotificationSetting[];

  @OneToMany(() => PortfolioDetail, (portfolioDetail) => portfolioDetail.user)
  portfolioDetails: PortfolioDetail[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => SkillsDetail, (skillsDetail) => skillsDetail.user)
  skillsDetails: SkillsDetail[];

  @OneToMany(() => SocialUser, (socialUser) => socialUser.user)
  socialUsers: SocialUser[];

  @OneToMany(() => UserTrack, (userTrack) => userTrack.user)
  userTracks: UserTrack[];

  @OneToMany(() => LanguageDetail, (languageDetail) => languageDetail.user)
  languages: LanguageDetail[];

  @OneToMany(() => ReferenceDetail, (referenceDetail) => referenceDetail.user)
  references: ReferenceDetail[];

  @OneToMany(
    () => WorkExperienceDetail,
    (workExperienceDetail) => workExperienceDetail.user
  )
  workExperienceDetails: WorkExperienceDetail[];
}
