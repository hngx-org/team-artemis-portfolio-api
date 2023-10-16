import { Request, Response, RequestHandler, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { validate as isValidUUID } from "uuid";
import {
  PortfolioDetail,
  User,
  WorkExperienceDetail,
  AboutDetail,
  EducationDetail,
  InterestDetail,
  Skill,
  Project,
  Section,
  SkillsDetail,
  Tracks,
} from "../database/entities";
import { NotFoundError, BadRequestError } from "../middlewares/index";

const portfolioDetailsRepository =
  connectionSource.getRepository(PortfolioDetail);
const portfolioRepository = connectionSource.getRepository(PortfolioDetail);
const userRepository = connectionSource.getRepository(User);
const workExperienceRepository =
  connectionSource.getRepository(WorkExperienceDetail);
const interestRepository = connectionSource.getRepository(InterestDetail);
const skillRepository = connectionSource.getRepository(Skill);
const projectRepository = connectionSource.getRepository(Project);
const sectionRepository = connectionSource.getRepository(Section);

export interface UpdatePortfolioDetailsDTO {
  name?: string;
  city?: string;
  country?: string;
}

const getPortfolioDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId || !isValidUUID(`${userId}`)) {
      throw new BadRequestError(`${userId} is not a valid UUID`);
    }

    const user = await userRepository.findOne({ where: { id: userId } });
    const workExperience = await connectionSource.manager.find(
      WorkExperienceDetail,
      { where: { user: { id: userId } } }
    );

    const education = await connectionSource.manager.find(EducationDetail, {
      where: { user },
    });

    const skills = await connectionSource.manager.find(SkillsDetail, {
      where: { user },
    });

    const interests = await connectionSource.manager.find(InterestDetail, {
      where: { user },
    });

    const about = await connectionSource.manager.find(AboutDetail, {
      where: { user },
    });

    const projects = await connectionSource.manager.find(Project, {
      where: { user },
    });

    const sections = await connectionSource.manager.find(Section);
    res.status(200).json({
      user,
      education,
      skills,
      interests,
      about,
      projects,
      sections,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllPortfolioDetails = async (req: Request, res: Response) => {
  const PortfolioDetails = await portfolioRepository.find();
  return res.json({ PortfolioDetails });
};

const updatePortfolioDetails: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const { name, trackId, city, country } = req.body;

    if (!req.body) {
      throw new BadRequestError("No data provided");
    }

    const userRepository = connectionSource.getRepository(User);
    const portfolioDetailsRepository =
      connectionSource.getRepository(PortfolioDetail);
    const userTrackRepository = connectionSource.getRepository(Tracks);
    const trackRepository = connectionSource.getRepository(Tracks);

    let user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError("User Not Found");
    }

    if (name) {
      const splitName = name.split(" ");
      await userRepository.update(user.id, {
        firstName: splitName[0],
        lastName: splitName[1],
      });

      // Fetch the updated user immediately
      user = await userRepository.findOne({ where: { id: userId } });
    }

    let track: Tracks;

    if (trackId) {
      track = await trackRepository.findOne({ where: { id: trackId } });

      if (!track) {
        throw new NotFoundError("Track Not Found");
      }

      const userTrack = await userTrackRepository.find({where:{user}});

      if (!userTrack) {
        const newUserTrack = userTrackRepository.create({
          trackId: trackId,
          userId,
        });

        await userTrackRepository.save(newUserTrack);
      }
    }

    let portfolio = await portfolioDetailsRepository.findOne({
      where: { user {id: user_id} },
    });

    if (!portfolio) {
      throw new NotFoundError("Portfolio Not Found");
    }

    if (city) {
      portfolio.city = city;
    }

    if (country) {
      portfolio.country = country;
    }

    portfolio = await portfolioDetailsRepository.save(portfolio);

    console.log("Successfully updated user profile portfolio details");
    return success(
      res,
      {
        portfolio: portfolio,
        // track: track,
        user: user,
      },
      "Successfully updated user profile portfolio details"
    );
  } catch (error) {
    console.log("Error updating profile detail:", error.message);
    next(error);
  }
};

// delete Portfolio Profile details
const deletePortfolioDetails: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // convert the id to number
    const id = parseInt(req.params.id);

    // find the porfolio by id
    const portfolioToRemove = await portfolioDetailsRepository.findOneBy({
      id: id,
    });

    // return error if porfolio is not found
    if (!portfolioToRemove) {
      throw new NotFoundError("Portfolio profile details not found");
    }

    const portfolio = await portfolioDetailsRepository.remove(
      portfolioToRemove
    );
    res.status(200).json({
      message: "Portfolio profile details deleted successfully",
      portfolio,
    });
  } catch (error) {
    return next(error);
  }
};

export {
  getPortfolioDetails,
  getAllPortfolioDetails,
  updatePortfolioDetails,
  deletePortfolioDetails,
};
