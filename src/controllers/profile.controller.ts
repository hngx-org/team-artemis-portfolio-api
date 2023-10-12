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
import {
  cloudinaryService,
  uploadProfileCoverPhotoService,
  uploadProfileImageService,
} from "../services";
import { error, success } from "../utils";
import { validateUser } from "../middlewares/auth";

// Get the repository for the PortfolioDetails entity
const userRepository = connectionSource.getRepository(User);
const portfolioRepository = connectionSource.getRepository(PortfolioDetails);
const userTrackRepository = connectionSource.getRepository(UserTrack);

// Export the uploadProfileImageController function
export const uploadProfileImageController: express.RequestHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.files) return error(res, "add event image", 400);
    const { service, userId } = req.body;

    const response = await validateUser(
      req.headers.authorization,
      "portfolio.update.own"
    );

    if (!response.authorized)
      return error(res, "Not authorized to perform action", 400);

    const { urls } = await cloudinaryService(req.files, service);
    const data = await uploadProfileImageService(response.user.id, urls);
    return success(res, data, "Profile picture uploaded successfully");
  } catch (err) {
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};



export const coverphoto: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.files) {
      return error(res, "No files were uploaded", 400);
    }

    const response = await validateUser(
      req.headers.authorization,
      "portfolio.update.own"
    );

    if (!response.authorized)
      return error(res, "Not authorized to perform action", 400);

    const { urls } = await cloudinaryService(req.files, req.body.service);

    const data = await uploadProfileCoverPhotoService(response.user.id, urls);

    return success(res, data, "Profile cover photo uploaded successfully");
  } catch (err) {
    if (err instanceof Error) {
      return error(res, err.message, 500);
    } else {
      return error(res, "An unknown error occurred", 500);
    }
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.status(200).json({ users });
};

export const getUserById = async (req: Request, res: Response) => {
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
    console.error("Error updating portfolio details:", error);

    if (error instanceof SyntaxError) {
      // Handle JSON parsing error
      return res
        .status(400)
        .json({ message: "Invalid JSON format in request body" });
    } else if (error.code === "23505") {
      // Handle duplicate key constraint violation (unique constraint violation)
      return res
        .status(409)
        .json({ message: "Duplicate key value in the database" });
    } else if (error.code === "22P02") {
      // Handle invalid integer format error
      return res.status(400).json({ message: "Invalid ID format" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProfileController = async (req: Request, res: Response) => {
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

// delete Portfolio Profile details
export const deletePortfolioDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    // convert the id to number
    const id = parseInt(req.params.id);

    // find the porfolio by id
    const portfolioToRemove = await portfolioRepository.findOneBy({
      id: id,
    });

    // return error if porfolio is not found
    if (!portfolioToRemove) {
      return res.status(404).json({ error: "Portfolio Details not found!" });
    }

    // delete the porfolio

    const portfolio = await portfolioRepository.remove(
      portfolioToRemove
    );
    res.status(200).json({
      message: "Portfolio profile details deleted successfully",
      portfolio,
    });
  } catch (error) {
    res.status(500).json(error as Error);
  }
}




