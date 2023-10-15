import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("social_user_pkey", ["id"], { unique: true })
@Entity("social_user", { schema: "public" })
export class SocialUser {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "url", nullable: true })
  url: string | null;

  @ManyToOne(() => SocialUser, (socialUser) => socialUser.socialUsers, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "social_media_id", referencedColumnName: "id" }])
  socialMedia: SocialUser;

  @OneToMany(() => SocialUser, (socialUser) => socialUser.socialMedia)
  socialUsers: SocialUser[];

  @ManyToOne(() => User, (user) => user.socialUsers, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
