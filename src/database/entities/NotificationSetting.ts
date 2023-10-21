import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("notification_setting_pkey", ["id"], { unique: true })
@Entity("notification_setting", { schema: "public" })
export class NotificationSetting {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("boolean", { name: "email_summary", nullable: true })
  emailSummary: boolean | null;

  @Column("boolean", { name: "special_offers", nullable: true })
  specialOffers: boolean | null;

  @Column("boolean", { name: "community_update", nullable: true })
  communityUpdate: boolean | null;

  @Column("boolean", { name: "follow_update", nullable: true })
  followUpdate: boolean | null;

  @Column("boolean", { name: "new_messages", nullable: true })
  newMessages: boolean | null;

  @ManyToOne(() => User, (user) => user.notificationSettings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
