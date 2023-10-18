import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("language_pkey", ["id"], { unique: true })
@Entity("language", { schema: "public" })
export class Language {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name", nullable: false })
  name: string | null;
}
