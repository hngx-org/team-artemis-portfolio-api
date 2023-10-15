import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("portfolio_detail_pkey", ["id"], { unique: true })
@Entity("portfolio_detail", { schema: "public" })
export class PortfolioDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "city", nullable: true })
  city: string | null;

  @Column("character varying", { name: "country", nullable: true })
  country: string | null;

  @ManyToOne(() => User, (user) => user.portfolioDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
