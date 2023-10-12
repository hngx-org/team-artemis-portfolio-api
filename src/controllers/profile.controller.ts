import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { AnyZodObject, z } from "zod";
import { connectionSource } from "../database/data-source";
import { PortfolioDetails, Tracks, UserTrack } from "../database/entity/model";
import { User } from "../database/entity/user";
import { cloudinaryService, uploadProfileImageService } from "../services";
import { error, success } from "../utils";

// Get the repository for the PortfolioDetails entity
const userRepository = connectionSource.getRepository(User);
const portfolioRepository = connectionSource.getRepository(PortfolioDetails);
const userTrackRepository = connectionSource.getRepository(UserTrack);

// Export the uploadProfileImageController function
const uploadProfileImageController: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.files) return error(res, "add event image", 400);
    const { service, userId } = req.body;

    const { urls } = await cloudinaryService(req.files, service);
    const data = await uploadProfileImageService(userId, urls);
    return success(res, data, "Profile picture uploaded successfully");
  } catch (err) {
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.status(200).json({ users });
};

const getUserById = async (req: Request, res: Response) => {
  let tracks: any[] = [];
  try {
    const { userId } = req.params;
    const user = await userRepository.findOne({ where: { id: userId } });
    const portfolio = await portfolioRepository.findOne({ where: { userId } });
    const userTracks = await userTrackRepository
      .createQueryBuilder("userTrack")
      .innerJoinAndSelect("userTrack.track", "track")
      .where("userTrack.userId = :userId", { userId: userId })
      .getMany();
    for (let userTrack of userTracks) {
      tracks.push(userTrack.track);
    }
    res.status(200).json({ user, portfolio, tracks });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

const createProfileController = async (req: Request, res: Response) => {
  try {
    const { name, trackId, city, country } = req.body;
    const userId = req.params.userId;

    const userRepository = connectionSource.getRepository(User);
    const portfolioDetailsRepository =
      connectionSource.getRepository(PortfolioDetails);
    const userTrackRepository = connectionSource.getRepository(UserTrack);
    const trackRepository = connectionSource.getRepository(Tracks);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return error(res, "User Not found", 400);
    }

    if (name) {
      userRepository.update(user.id, { lastName: name });
    }

    let track: Tracks;

    if (trackId) {
      // first  check if the track exists
      track = await trackRepository.findOne({ where: { id: trackId } });

      if (!track) {
        return error(res, "Track Not found", 400);
      }

      const userTrack = await userTrackRepository.findOne({
        where: { trackId: trackId, userId },
      });

      if (!userTrack) {
        const newUser = userTrackRepository.create({
          trackId: trackId,
          userId,
        });

        await userTrackRepository.save(newUser);
      }
    }

    const portfolio = portfolioDetailsRepository.create({
      city,
      country,
      userId,
    });

    await portfolioDetailsRepository.save(portfolio);

    return success(
      res,
      { portfolio: portfolio, user: user },
      "Successfully Created Portfolio profile"
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
};

export {
  getAllUsers,
  getUserById,
  createProfileController,
  uploadProfileImageController,
};
