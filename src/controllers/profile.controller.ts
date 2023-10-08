import { Request, RequestHandler, Response } from "express";
import { connectionSource } from "../database/data-source";
import { PortfolioDetails, UserTrack } from "../database/entity/model";
import { User } from "../database/entity/user";
import { cloudinaryService, uploadProfileImageService } from "../services";
import { error, success } from "../utils";

export const uploadProfileImageController: RequestHandler = async (req: Request, res: Response) => {
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

export const createProfileController = async (req: Request, res: Response) => {
  try {
    const { name, trackId, city, country } = req.body;
    const userId = req.params.userId;

    const userRepository = connectionSource.getRepository(User);
    const portfolioDetailsRepository = connectionSource.getRepository(PortfolioDetails);
    const userTrackRepository = connectionSource.getRepository(UserTrack);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return error(res, "User Not found", 400);
    }

    if (name) {
      userRepository.update(user.id, { lastName: name });
    }

    const userTrack = userTrackRepository.findOne({ where: { trackId: trackId, userId } });

    if (!userTrack) {
      const newUser = userTrackRepository.create({ trackId: trackId, userId });

      await userTrackRepository.save(newUser);
    }

    const portfolio = portfolioDetailsRepository.create({ city, country, userId });

    await portfolioDetailsRepository.save(portfolio);

    return success(res, portfolio, "Successfully Created Portfolio profile");
  } catch (err) {
    return error(res, err.message, 500);
  }
};
