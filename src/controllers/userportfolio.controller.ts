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
} from "../database/entity/model";
import { NotFoundError, BadRequestError } from "../middlewares/index";

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
    res
      .status(200)
      .json([
        workExperience,
        education,
        skills,
        interests,
        about,
        projects,
        sections,
      ]);
  } catch (error) {
    return next(error);
  }
};

const getAllPortfolioDetails = async (req: Request, res: Response) => {
  const PortfolioDetails = await portfolioRepository.find();
  return res.json({ PortfolioDetails });
};

// Export the updatePortfolioDetails function
const updatePortfolioDetails: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      throw new BadRequestError("Must provide an ID");
    }

    // Find the existing portfolio details by ID
    const portfolioDetails = await portfolioDetailsRepository.findOne({
      where: { id },
    });

    if (!portfolioDetails) {
      throw new NotFoundError("Portfolio details not found");
    }

    // Validate and apply updates from the DTO
    const updateData = req.body as UpdatePortfolioDetailsDTO;

    // if (updateData.name) portfolioDetails.name = updateData.name;
    if (updateData.city) portfolioDetails.city = updateData.city;
    if (updateData.country) portfolioDetails.country = updateData.country;

    // Save the updated portfolio details
    await portfolioDetailsRepository.save(portfolioDetails);

    res.status(200).json({
      message: "Portfolio details updated successfully",
      portfolioDetails,
    });
  } catch (error) {
    return next(error);
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
