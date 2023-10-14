import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { AnyZodObject, z } from "zod";
import { connectionSource } from "../database/data-source";
import { PortfolioDetails, Tracks, UserTrack, WorkExperienceDetail, Section, AboutDetail, EducationDetail, Project, InterestDetail, Skill, SkillsDetail } from "../database/entity/model";
import { User } from "../database/entity/user";
import {
  cloudinaryService,
  uploadProfileCoverPhotoService,
  uploadProfileImageService,
} from "../services";
import { error, success } from "../utils";
import { authMiddleWare, validateUser } from "../middlewares/auth";
import { BadRequestError, InternalServerError } from "../middlewares";


// Get the repository for the PortfolioDetails entity
const userRepository = connectionSource.getRepository(User);
const portfolioRepository = connectionSource.getRepository(PortfolioDetails);
const userTrackRepository = connectionSource.getRepository(UserTrack);
const workExperienceRepositry = connectionSource.getRepository(WorkExperienceDetail);
const sectionRepository = connectionSource.getRepository(Section);
const aboutRepository = connectionSource.getRepository(AboutDetail);
const educationRepository = connectionSource.getRepository(EducationDetail);
const projectRepository = connectionSource.getRepository(Project);
const interestRepository = connectionSource.getRepository(InterestDetail);
const skillRepository = connectionSource.getRepository(Skill);
const skillsDetailRepository = connectionSource.getRepository(SkillsDetail);


// Export the uploadProfileImageController function
export const uploadProfileImageController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.files) return error(res, "add event image", 400);
    const { service, userId } = req.body;
    const files = req.files as any;


    const imagesRes = await cloudinaryService(files, req.body.service);


    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return error(res, "User Not found", 400);
    }
    const { urls } = await cloudinaryService(req.files, service);
    const data = await uploadProfileImageService(user.id, urls);

    console.log(urls)
    user.profilePic = imagesRes[0];

    return success(res, data, "Profile picture uploaded successfully");
  } catch (err) {
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};

export const uploadProfileCoverController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.files) return error(res, "add event image", 400);
    const { service, userId } = req.body;

    const files = req.files as any;


    const imagesRes = await cloudinaryService(files, req.body.service);


    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return error(res, "User Not found", 400);
    }


    const { urls } = await cloudinaryService(req.files, service);
    const data = await uploadProfileCoverPhotoService(user.id, urls);

    console.log(urls)
    user.profileCoverPhoto = imagesRes[0];


    return success(res, data, "Cover photo uploaded successfully");
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
    res.status(404).json({ message: "User not found" });
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

    //find or create user profile

    const user = await userRepository.findOne({ where: { id: userId } });

    // const userProfile = await userRepository.upsert({
    //   id: userId,
    //   firstName: name,

    // });


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

    const portfolio = await portfolioRepository.remove(portfolioToRemove);
    res.status(200).json({
      message: "Portfolio profile details deleted successfully",
      portfolio,
    });
  } catch (error) {
    res.status(500).json(error as Error);
  }
};

export const deleteAllSectionEntries: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {


    const dynamicSection = {
      about: aboutRepository,
      education: educationRepository,
      workExperience: workExperienceRepositry,
      skills: skillsDetailRepository,
      projects: projectRepository,
      interests: interestRepository,
      sections: sectionRepository
    }


    const { userId } = req.params;
    const { sectionName } = req.body;


    const currentRepo = dynamicSection[sectionName];

    if (currentRepo === undefined) {
      return next(new BadRequestError("Invalid or missing section name"));
    }

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return next(new BadRequestError("User not found"));
    }
    const alluserEntries = await currentRepo.find({ where: { userId: userId } });
    if (alluserEntries.length === 0) {
      return next(new BadRequestError("No entries to delete"));
    }
    const response = await currentRepo.remove(alluserEntries);
    if (response.affected === 0) {
      return next(new BadRequestError("No entries to delete"));
    }
    return success(res, "Successfully deleted all entries");
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
};
