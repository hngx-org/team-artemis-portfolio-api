import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import axios from "axios";
import { AnyZodObject, ZodError, z } from "zod";
import { connectionSource } from "../database/data-source";
import {
  PortfolioDetail,
  Award,
  Tracks,
  UserTrack,
  WorkExperienceDetail,
  Section,
  AboutDetail,
  EducationDetail,
  Project,
  InterestDetail,
  Skill,
  SkillsDetail,
  User,
  Certificate,
  SocialUser,
  Language,
  ReferenceDetail,
  LanguageDetail,
  CustomUserSection,
} from "../database/entities";
import {
  cloudinaryService,
  uploadProfileCoverPhotoService,
  uploadProfileImageService,
} from "../services";
import { error, success } from "../utils";
import { authMiddleWare, validateUser } from "../middlewares/auth";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../middlewares";
import { createPorfolioDataSchema } from "../middlewares/profile.zod";
import { nextTick } from "process";

// Get the repository for the PortfolioDetails entity
const userRepository = connectionSource.getRepository(User);
const portfolioRepository = connectionSource.getRepository(PortfolioDetail);
const userTrackRepository = connectionSource.getRepository(UserTrack);
const workExperienceRepositry =
  connectionSource.getRepository(WorkExperienceDetail);
const sectionRepository = connectionSource.getRepository(Section);
const aboutRepository = connectionSource.getRepository(AboutDetail);
const educationRepository = connectionSource.getRepository(EducationDetail);
const projectRepository = connectionSource.getRepository(Project);
const interestRepository = connectionSource.getRepository(InterestDetail);
const skillsDetailRepository = connectionSource.getRepository(SkillsDetail);
const portfolioDetailsRepository =
  connectionSource.getRepository(PortfolioDetail);
const trackRepository = connectionSource.getRepository(Tracks);
const certificateRepository = connectionSource.getRepository(Certificate);
const awardRepository = connectionSource.getRepository(Award);
const languageDetailsRepository =
  connectionSource.getRepository(LanguageDetail);
const contactsRepository = connectionSource.getRepository(SocialUser);
const referenceRepository = connectionSource.getRepository(ReferenceDetail);
const customRepository = connectionSource.getRepository(CustomUserSection);
// Export the uploadProfileImageController function
export const uploadProfileImageController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) return error(res, "add event image", 400);
    const { service, userId } = req.body;
    const files = req.files as any;
    const imagesRes = await cloudinaryService(files, req.body.service);

    const user = await userRepository.findOne({
      where: { id: userId },
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "profilePic",
        "profileCoverPhoto",
        "phoneNumber",
        "location",
        "username",
        "country",
        "slug",
      ],
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const { urls } = await cloudinaryService(req.files, service);
    const data = await uploadProfileImageService(user.id, urls);

    console.log(urls);
    user.profilePic = imagesRes[0];

    return success(res, data, "Profile picture uploaded successfully");
  } catch (err) {
    return next(err);
  }
};

export const uploadProfileCoverController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
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

    console.log(urls);
    user.profileCoverPhoto = imagesRes[0];

    return success(res, data, "Cover photo uploaded successfully");
  } catch (err) {
    return next(err);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.status(200).json({ users });
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId: id } = req.params;
    const userId = id.trim();

    const user = await userRepository.findOne({
      where: { id: userId },
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "profilePic",
        "profileCoverPhoto",
        "phoneNumber",
        "location",
        "username",
        "country",
        "slug",
      ],
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const portfolio = await portfolioRepository.findOne({
      where: { user: { id: user.id } },
    });
    const userTracks = await userTrackRepository.findOne({
      where: { user: { id: user.id } },
      relations: ["track"],
    });

    const allBadges = await connectionSource.manager.query(
      `SELECT badge_id FROM "user_badge" WHERE "user_id" = '${user.id}' ORDER BY created_at DESC`
    );
    let badges = [];
    if (allBadges.length > 0) {
      const badgeIds = allBadges?.map((badge) => badge.badge_id) || [];

      badges = await connectionSource.manager.query(
        `SELECT id, name, badge_image  FROM "skill_badge" WHERE "id" IN (${badgeIds.join(
          ","
        )})`
      );
    }

    return success(
      res,
      { user, portfolio, userTracks: userTracks?.track, badges },
      "Fetched User Successfully"
    );
  } catch (error) {
    console.error(error);
    return error(res, "Internal Server Error", 500);
  }
};

export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    try {
      await createPorfolioDataSchema.parse({
        body: req.body,
        params: req.params,
      });
    } catch (err) {
      const { errors } = err as ZodError;
      res.statusCode = 400;
      return res.json({
        message: errors.map((error) => {
          return error.message;
        }),
      });
    }

    const { name, trackId, city, country } = req.body;
    if (!name && !trackId && !city && !country) {
      throw new BadRequestError("No data to update");
    }
    const { userId } = req.params;

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (name) {
      await userRepository.update(user.id, {
        firstName: name?.split(" ")[0],
        lastName: name?.split(" ")[1] || "",
      });
    }

    if (city || country) {
      const userPortfolio = await portfolioDetailsRepository.findOne({
        where: { user: { id: user.id } },
      });
      if (!userPortfolio) {
        // create a new portfolio
        const portfolio = portfolioDetailsRepository.create({
          city,
          country,
          user,
        });
        await portfolioDetailsRepository.save(portfolio);
      } else {
        await portfolioDetailsRepository.update(userPortfolio.id, {
          city: city || userPortfolio.city,
          country: country || userPortfolio.country,
        });
      }
    }

    if (trackId) {
      // first  check if the track exists
      const track = await trackRepository.findOne({ where: { id: trackId } });
      if (!track) {
        throw new NotFoundError("Track not found");
      }

      const userTrack = await userTrackRepository.findOne({
        where: { user: { id: user.id } },
        relations: ["track"],
      });

      console.log(userTrack);

      if (!userTrack) {
        // create a new user track
        const newUserTrack = userTrackRepository.create({
          user,
          track,
        });
        await userTrackRepository.save(newUserTrack);
      } else {
        if (!(userTrack?.track.id === track.id)) {
          await userTrackRepository.update(userTrack.id, {
            track,
          });
        }
      }
    }
    const updatedUser = await userRepository.findOne({
      where: { id: user.id },
    });
    const portfolio = portfolioDetailsRepository.create({
      city,
      country,
      user: updatedUser,
    });

    const userTrack = await userTrackRepository.findOne({
      where: { user: { id: user.id } },
      relations: ["track"],
    });

    if(portfolio?.user) {
      delete portfolio.user.password;
      delete portfolio.user.email
    }

    return success(
      res,
      { portfolio: portfolio, track: userTrack?.track },
      "Successfully Updated Portfolio profile"
    );
  } catch (err) {
    return next(err);
  }
};

// delete Portfolio Profile details
export const deletePortfolioDetails: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
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
      throw new NotFoundError("Portfolio Details not found!");
    }

    // delete the porfolio

    const portfolio = await portfolioRepository.remove(portfolioToRemove);
    res.status(200).json({
      message: "Portfolio profile details deleted successfully",
      portfolio,
    });
  } catch (error) {
    return next(error);
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
      projects: projectRepository,
      interests: interestRepository,
      sections: sectionRepository,
      certificate: certificateRepository,
      skills: skillsDetailRepository,
      awards: awardRepository,
      languages: languageDetailsRepository,
      reference: referenceRepository,
      contacts: contactsRepository,
      custom: customRepository,
    };

    const { userId } = req.params;
    const { section } = req.body;
    if (!userId) {
      return next(new BadRequestError("User id is missing"));
    }

    const currentRepo = dynamicSection[section];

    if (currentRepo === undefined) {
      return next(new BadRequestError("Invalid or missing section name"));
    }

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return next(new BadRequestError("User not found"));
    }

    const alluserEntries = await currentRepo.find({
      where: { user: { id: user.id } },
    });
    if (alluserEntries.length === 0) {
      return next(new BadRequestError("No entries to delete"));
    }
    if (section === "custom") {
      const { custom_id } = req.body
      if (!custom_id) {
        return next(new BadRequestError("Custom id is missing"));
      }
      const allEntries = await currentRepo.find({ where: { id: custom_id } })
      if (allEntries.length === 0) {
        return next(new BadRequestError("No entries to delete"));
      }
      await customRepository.remove(allEntries);

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
