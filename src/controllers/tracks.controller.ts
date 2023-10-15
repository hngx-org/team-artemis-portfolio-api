import { Request, Response } from "express";
import { connectionSource } from "../database/data-source";
import { Tracks } from "../database/entities";
import { error, success } from "../utils";

export const getAllTracks = async (req: Request, res: Response) => {
  try {
    const trackRepository = connectionSource.getRepository(Tracks);

    const tracks = await trackRepository.find();

    return success(res, tracks, "Succesfully Fetched Tracks");
  } catch (err) {
    return error(res, err.message);
  }
};
