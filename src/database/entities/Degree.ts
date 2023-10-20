import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EducationDetail } from "./EducationDetail";

@Index("degree_pkey", ["id"], { unique: true })
@Entity("degree", { schema: "public" })
export class Degree {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "type", nullable: true })
  type: string | null;

  @OneToMany(() => EducationDetail, (educationDetail) => educationDetail.degree)
  educationDetails: EducationDetail[];
}
