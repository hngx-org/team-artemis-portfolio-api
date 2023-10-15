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

@Index("skills_detail_pkey", ["id"], { unique: true })
@Entity("skills_detail", { schema: "public" })
export class SkillsDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "skills", nullable: true })
  skills: string | null;

  @ManyToOne(() => Section, (section) => section.skillsDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "section_id", referencedColumnName: "id" }])
  section: Section;

  @ManyToOne(() => User, (user) => user.skillsDetails, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
