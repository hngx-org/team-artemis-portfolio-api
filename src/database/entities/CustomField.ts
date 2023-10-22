import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CustomUserSection } from "./CustomUserSection";

@Index("custom_field_pkey", ["id"], { unique: true })
@Entity("custom_field", { schema: "public" })
export class CustomField {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "field_type", nullable: true })
  fieldType: string | null;

  @Column("character varying", { name: "field_name", nullable: true })
  fieldName: string | null;

  @Column("text", { name: "value", nullable: true })
  value: string | null;

  @ManyToOne(
    () => CustomUserSection,
    (customUserSection) => customUserSection.customFields,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "custom_section_id", referencedColumnName: "id" }])
  customSection: CustomUserSection;
}
