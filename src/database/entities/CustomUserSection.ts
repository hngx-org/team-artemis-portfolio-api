import {
  Entity,
  Index,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CustomField } from "./CustomField";
import { Section } from "./Section";
import { User } from "./User";

@Index("custom_user_section_pkey", ["id"], { unique: true })
@Entity("custom_user_section", { schema: "public" })
export class CustomUserSection {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @OneToMany(() => CustomField, (customField) => customField.customSection)
  customFields: CustomField[];

  @ManyToOne(() => Section, (section) => section.customUserSections, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "section_id", referencedColumnName: "id" }])
  section: Section;

  @ManyToOne(() => User, (user) => user.customUserSections, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
