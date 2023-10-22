import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("social_media_pkey", ["id"], { unique: true })
@Entity("social_media", { schema: "public" })
export class SocialMedia {
  @PrimaryGeneratedColumn({type:"integer", name: "id" })
  id: number;

  @Column("text", { name: "name", nullable: true })
  name: string | null;
}
