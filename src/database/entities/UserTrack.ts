import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tracks } from "./Tracks";
import { User } from "./User";

@Index("user_track_pkey", ["id"], { unique: true })
@Entity("user_track", { schema: "public" })
export class UserTrack {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Tracks, (tracks) => tracks.userTracks, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "track_id", referencedColumnName: "id" }])
  track: Tracks;

  @ManyToOne(() => User, (user) => user.userTracks, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
