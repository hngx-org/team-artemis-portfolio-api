import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Degree } from "./Degree";
import { Section } from "./Section";
import { User } from "./User";

@Index("education_detail_pkey", ["id"], { unique: true })
@Entity("education_detail", { schema: "public" })
export class EducationDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "field_of_study", nullable: true })
  fieldOfStudy: string | null;

  @Column("character varying", { name: "school", nullable: true })
  school: string | null;

  @Column("character varying", { name: "from", nullable: true })
  from: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "to", nullable: true })
  to: string | null;

  @ManyToOne(() => Degree, (degree) => degree.educationDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "degree_id", referencedColumnName: "id" }])
  degree: Degree;

  @ManyToOne(() => Section, (section) => section.educationDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "section_id", referencedColumnName: "id" }])
  section: Section;

  @ManyToOne(() => User, (user) => user.educationDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
