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

@Index("language_detail_pkey", ["id"], { unique: true })
@Entity("language_detail", { schema: "public" })
export class LanguageDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "languages", nullable: true })
  languages: string | null;

  @ManyToOne(() => Section, (section) => section, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "section_id", referencedColumnName: "id" }])
  section: Section;

  @ManyToOne(() => User, (user) => user.languages, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
