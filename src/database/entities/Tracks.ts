import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserTrack } from "./UserTrack";

@Index("tracks_pkey", ["id"], { unique: true })
@Entity("tracks", { schema: "public" })
export class Tracks {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "track", nullable: true })
  track: string | null;

  @OneToMany(() => UserTrack, (userTrack) => userTrack.track)
  userTracks: UserTrack[];
}
