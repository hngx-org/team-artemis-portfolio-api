import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

import { Language, SocialUser, References } from "./model";
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

  @Column({
    type: "boolean",
    nullable: true,
    name: "two_factor_auth",
    default: false,
  })
  twoFactorAuth: boolean;

  @Column({ type: "text", nullable: true, name: "profile_pic" })
  profilePic: string;

  @Column({ type: "text", nullable: true, name: "profile_cover_photo" })
  profileCoverPhoto: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    name: "refresh_token",
  })
  refreshToken: string;

  @OneToMany(() => Language, (language) => language.user, { cascade: true })
  languages: Language[];

  @OneToMany(() => References, (references) => references.user) // Use References here
  references: References[]; // Assuming you want to reference multiple References

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "createdAt",
  })
  createdAt: Date;
  socialUsers: string;
}
