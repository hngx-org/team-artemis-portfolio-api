import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProjectsImage } from "./ProjectsImage";

@Index("images_pkey", ["id"], { unique: true })
@Entity("images", { schema: "public" })
export class Images {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "url", nullable: true })
  url: string | null;

  @OneToMany(() => ProjectsImage, (projectsImage) => projectsImage.image)
  projectsImages: ProjectsImage[];
}
