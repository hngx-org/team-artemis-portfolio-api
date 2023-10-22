import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("social_media_pkey", ["Id"], { unique: true })
@Entity("SocialMedias", { schema: "public" })
export class SocialMedia {
  @PrimaryGeneratedColumn({type:"integer", name: "Id" })
  Id: number;

  @Column("text", { name: "name", nullable: true })
  name: string | null;
}
