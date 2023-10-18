import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Section } from "./Section";
import { User } from "./User";
import { ProjectsImage } from "./ProjectsImage";

@Index("project_pkey", ["id"], { unique: true })
@Entity("project", { schema: "public" })
export class Project {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("character varying", { name: "year", nullable: true })
  year: string | null;

  @Column("character varying", { name: "url", nullable: true })
  url: string | null;

  @Column("text", { name: "tags", nullable: true })
  tags: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("integer", { name: "thumbnail", nullable: true })
  thumbnail: number | null;

  @ManyToOne(() => Section, (section) => section.projects, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "section_id", referencedColumnName: "id" }])
  section: Section;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @OneToMany(() => ProjectsImage, (projectsImage) => projectsImage.project)
  projectsImages: ProjectsImage[];
}
