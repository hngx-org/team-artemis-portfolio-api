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

@Index("reference_detail_pkey", ["id"], { unique: true })
@Entity("reference_detail", { schema: "public" })
export class ReferenceDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "referer", nullable: false })
  referer: string | null;

  @Column("text", { name: "company", nullable: false })
  company: string | null;

  @Column("text", { name: "position", nullable: false })
  position: string | null;

  @Column("text", { name: "email", nullable: false })
  email: string | null;

  @Column("text", { name: "phone_number", nullable: false })
  phone_number: string | null;

  @ManyToOne(() => Section, (section) => section.reference, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "section_id", referencedColumnName: "id" }])
  section: Section;

  @ManyToOne(() => User, (user) => user.skillsDetails, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
