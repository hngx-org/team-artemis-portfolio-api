import { Request, Response, RequestHandler, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { validate as isValidUUID } from "uuid";
import {
  PortfolioDetails,
  AboutDetail,
  EducationDetail,
  InterestDetail,
  Project,
  Section,
  SkillsDetail,
  WorkExperienceDetail,
  UserTrack,
  Tracks
} from "../database/entity/model";
import { NotFoundError, BadRequestError, CustomError } from "../middlewares/index";
import { User } from "../database/entity/user";
import { success } from "../utils";

const portfolioDetailsRepository =
  connectionSource.getRepository(PortfolioDetails);
const portfolioRepository = connectionSource.getRepository(PortfolioDetails);

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

    const workExperience = await connectionSource.manager.find(
      WorkExperienceDetail,
      { where: { userId } }
    );

    const education = await connectionSource.manager.find(EducationDetail, {
      where: { userId },
    });

    const skills = await connectionSource.manager.find(SkillsDetail, {
      where: { userId },
    });

    const interests = await connectionSource.manager.find(InterestDetail, {
      where: { userId },
    });

    const about = await connectionSource.manager.find(AboutDetail, {
      where: { userId },
    });

    const projects = await connectionSource.manager.find(Project, {
      where: { userId },
    });

    const sections = await connectionSource.manager.find(Section);
    res.status(200).json({
      workExperience,
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
//.
const getAllPortfolioDetails = async (req: Request, res: Response) => {
  const PortfolioDetails = await portfolioRepository.find();
  return res.json({ PortfolioDetails });
};


const updatePortfolioDetails: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const { name, trackId, city, country } = req.body;

    if (!req.body) {
      throw new BadRequestError("No data provided");
    }

    const userRepository = connectionSource.getRepository(User);
    const portfolioDetailsRepository =
      connectionSource.getRepository(PortfolioDetails);
    const userTrackRepository = connectionSource.getRepository(UserTrack);
    const trackRepository = connectionSource.getRepository(Tracks);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError("User Not Found");
    }

    if (name) {
      let splitName = [];
      splitName = name.split(" ");
      userRepository.update(user.id, { firstName: splitName[0], lastName: splitName[1] });
    }

    let track: Tracks;

    if (trackId) {
      track = await trackRepository.findOne({ where: { id: trackId } });

      if (!track) {
        throw new NotFoundError("Track Not Found");
      }

      const userTrack = await userTrackRepository.findOne({ where: { trackId: trackId, userId } });

      if (!userTrack) {
        const newUser = userTrackRepository.create({
          trackId: trackId,
          userId,
        });

        await userTrackRepository.save(newUser);
      }
    }

    // Fetch the portfolio
    let portfolio = await portfolioDetailsRepository.findOne({ where: { userId: userId } });
    if (!portfolio) {
      throw new NotFoundError("Portfolio Not Found");
    }
    portfolio.city = city;
    portfolio.country = country;

    portfolio = await portfolioDetailsRepository.save(portfolio);

    console.log("Successfully updated user profile portfolio details");
    return success(
      res, {
      portfolio: portfolio,
      track: track,
      user: user
    },
      "Successfully updated user profile portfolio details"
    );

  } catch (error) {
    console.log("Error updating profile detail:", error.message);
    next(error);
  }
}

// Export the updatePortfolioDetails function
// const updatePortfolioDetails: RequestHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (!id) {
//       throw new BadRequestError("Must provide an ID");
//     }

//     // Find the existing portfolio details by ID
//     const portfolioDetails = await portfolioDetailsRepository.findOne({
//       where: { id },
//     });

//     if (!portfolioDetails) {
//       throw new NotFoundError("Portfolio details not found");
//     }

//     // Validate and apply updates from the DTO
//     const updateData = req.body as UpdatePortfolioDetailsDTO;

//     // if (updateData.name) portfolioDetails.name = updateData.name;
//     if (updateData.city) portfolioDetails.city = updateData.city;
//     if (updateData.country) portfolioDetails.country = updateData.country;

//     // Save the updated portfolio details
//     await portfolioDetailsRepository.save(portfolioDetails);

//     res.status(200).json({
//       message: "Portfolio details updated successfully",
//       portfolioDetails,
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

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
