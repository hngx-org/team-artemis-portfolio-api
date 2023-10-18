import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { Tracks, UserTrack, User } from "../database/entities";
import { error, success } from "../utils";
import { NotFoundError, BadRequestError } from "../middlewares";

const trackRepository = connectionSource.getRepository(Tracks);
const userTrackRepository = connectionSource.getRepository(UserTrack);
const userRepository = connectionSource.getRepository(User);

export const getAllTracks = async (req: Request, res: Response) => {
  try {
    const trackRepository = connectionSource.getRepository(Tracks);

    const tracks = await trackRepository.find();

    return success(res, tracks, "Succesfully Fetched Tracks");
  } catch (err) {
    return error(res, err.message);
  }
};

export const getTrackById = async (req: Request, res: Response) => {
  try {
    const track = await trackRepository.findOne({
      where: { id: +req.params.id },
    });

    if (!track) {
      return error(res, "Track not found");
    }

    return success(res, track, "Succesfully Fetched Track");
  } catch (err) {
    return error(res, err.message);
  }
};

export const createUserTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, track_id } = req.body;
    if (!user_id || !track_id) {
      throw new BadRequestError("User id or Track id is missing");
    }

    const user = await userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const track = await trackRepository.findOne({ where: { id: track_id } });
    if (!track) {
      throw new NotFoundError("Track not found");
    }

    const userTrack = await userTrackRepository.findOne({
      where: { user },
      relations: ["track"],
    });
    console.log(userTrack);

    if (userTrack?.track && userTrack?.track?.id === track_id) {
      throw new BadRequestError("User already has track");
    }
    if (track) {
      await userTrackRepository.delete({ user });
    }

    const newUserTrack = new UserTrack();
    newUserTrack.user = user;
    newUserTrack.track = track;

    const data = await userTrackRepository.save(newUserTrack);

    return success(res, data, "Succesfully Created Track");
  } catch (err) {
    return next(err);
  }
};
