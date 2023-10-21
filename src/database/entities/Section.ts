import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AboutDetail } from "./AboutDetail";
import { Award } from "./Award";
import { Certificate } from "./Certificate";
import { CustomUserSection } from "./CustomUserSection";
import { EducationDetail } from "./EducationDetail";
import { InterestDetail } from "./InterestDetail";
import { Project } from "./Project";
import { SkillsDetail } from "./SkillsDetail";
import { WorkExperienceDetail } from "./WorkExperienceDetail";
import { LanguageDetail } from "./LanguageDetail";
import { ReferenceDetail } from "./Reference";

@Index("section_pkey", ["id"], { unique: true })
@Entity("section", { schema: "public" })
export class Section {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "meta", nullable: true })
  meta: string | null;

  @OneToMany(() => AboutDetail, (aboutDetail) => aboutDetail.section)
  aboutDetails: AboutDetail[];

  @OneToMany(() => Award, (award) => award.section)
  awards: Award[];

  @OneToMany(() => Certificate, (certificate) => certificate.section)
  certificates: Certificate[];

  @OneToMany(
    () => CustomUserSection,
    (customUserSection) => customUserSection.section
  )
  customUserSections: CustomUserSection[];

  @OneToMany(
    () => EducationDetail,
    (educationDetail) => educationDetail.section
  )
  educationDetails: EducationDetail[];

  @OneToMany(() => InterestDetail, (interestDetail) => interestDetail.section)
  interestDetails: InterestDetail[];

  @OneToMany(() => Project, (project) => project.section)
  projects: Project[];

  @OneToMany(() => LanguageDetail, (languageDetail) => languageDetail.section)
  languageDetail: LanguageDetail[];

  @OneToMany(() => ReferenceDetail, (reference) => reference.section)
  reference: ReferenceDetail[];

  @OneToMany(() => SkillsDetail, (skillsDetail) => skillsDetail.section)
  skillsDetails: SkillsDetail[];

  @OneToMany(
    () => WorkExperienceDetail,
    (workExperienceDetail) => workExperienceDetail.section
  )
  workExperienceDetails: WorkExperienceDetail[];
}