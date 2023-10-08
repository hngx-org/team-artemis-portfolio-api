import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

import { SocialUser } from "./model";
@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  username: string;

  @Column({ type: "varchar", length: 255, nullable: true, name: "first_name" })
  firstName: string;

  @Column({ type: "varchar", length: 255, nullable: true, name: "last_name" })
  lastName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  email: string;

  @Column({ type: "text", nullable: true, name: "section_order" })
  sectionOrder: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  provider: string;

  @Column({
    type: "boolean",
    nullable: true,
    name: "is_verified",
    default: false,
  })
  isVerified: boolean;

  @Column({ type: "boolean", nullable: true, name: "2fa", default: false })
  twoFactorAuth: boolean;

  @Column({ type: "text", nullable: true, name: "profile_pic" })
  profilePic: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    name: "refresh_token",
  })
  refreshToken: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  @OneToMany(() => SocialUser, (socialUser) => socialUser.userId)
  socialUsers: SocialUser[];
  createdAt: Date;
}
