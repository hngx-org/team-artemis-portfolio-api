import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("skill_pkey", ["id"], { unique: true })
@Entity("skill", { schema: "public" })
export class Skill {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "category_name", length: 100 })
  categoryName: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @ManyToOne(() => Skill, (skill) => skill.skills, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "parent_skill_id", referencedColumnName: "id" }])
  parentSkill: Skill;

  @OneToMany(() => Skill, (skill) => skill.parentSkill)
  skills: Skill[];
}
