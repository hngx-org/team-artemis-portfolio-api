import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Images } from "./Images";
import { Project } from "./Project";

@Index("projects_image_pkey", ["id"], { unique: true })
@Entity("projects_image", { schema: "public" })
export class ProjectsImage {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Images, (images) => images.projectsImages, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "image_id", referencedColumnName: "id" }])
  image: Images;

  @ManyToOne(() => Project, (project) => project.projectsImages, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Project;
}
