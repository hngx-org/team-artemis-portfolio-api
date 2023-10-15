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

@Index("about_detail_pkey", ["id"], { unique: true })
@Entity("about_detail", { schema: "public" })
export class AboutDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "bio", nullable: true })
  bio: string | null;

  @ManyToOne(() => Section, (section) => section.aboutDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "section_id", referencedColumnName: "id" }])
  section: Section;

  @ManyToOne(() => User, (user) => user.aboutDetails, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
