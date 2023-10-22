import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { SocialMedia } from "./SocialMedia"; // Import the SocialMedia entity
import { User } from "./User"; // Import the User entity
@Entity("social_user", { schema: "public" })
//bugfix on table name
export class SocialUser {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  //bugfix
  id: number;
  @Column("text", { name: "url", nullable: true })
  url: string | null;
  @Column("text", { name: "user_id", nullable: true })
  user_id: string | null;
  @ManyToOne(() => SocialMedia, (socialMedia) => socialMedia.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "social_media_id", referencedColumnName: "id" }])
  socialMedia: SocialMedia; // Reference the SocialMedia entity
  @ManyToOne(() => User, (user) => user.socialUsers, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User; // Reference the User entity
}
