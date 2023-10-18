import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Section } from "./Section";
import { User } from "./User";

@Index("work_experience_detail_pkey", ["id"], { unique: true })
@Entity("work_experience_detail", { schema: "public" })
export class WorkExperienceDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "role", nullable: true })
  role: string | null;

  @Column("character varying", { name: "company", nullable: true })
  company: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "start_month", nullable: true })
  startMonth: string | null;

  @Column("character varying", { name: "start_year", nullable: true })
  startYear: string | null;

  @Column("character varying", { name: "end_month", nullable: true })
  endMonth: string | null;

  @Column("character varying", { name: "end_year", nullable: true })
  endYear: string | null;

  @Column("boolean", { name: "is_employee", nullable: true })
  isEmployee: boolean | null;

  @ManyToOne(() => Section, (section) => section.workExperienceDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "section_id", referencedColumnName: "id" }])
  section: Section;

  @ManyToOne(() => User, (user) => user.workExperienceDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
