import { Request, Response, RequestHandler, NextFunction } from 'express';
import { connectionSource } from '../database/data-source';
import { validate as isValidUUID } from 'uuid';
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
  UserTrack,
  Award,
  Certificate,
  CustomUserSection,
  ReferenceDetail,
  SocialUser,
  LanguageDetail,
} from '../database/entities';
import { NotFoundError, BadRequestError } from '../middlewares/index';
import { getAllLanguages } from '../services/language.service';

const portfolioDetailsRepository =
  connectionSource.getRepository(PortfolioDetail);
const portfolioRepository = connectionSource.getRepository(PortfolioDetail);
const userRepository = connectionSource.getRepository(User);
const workExperienceRepository =
  connectionSource.getRepository(WorkExperienceDetail);
const interestRepository = connectionSource.getRepository(InterestDetail);
const referenceRepository = connectionSource.getRepository(ReferenceDetail);
const projectRepository = connectionSource.getRepository(Project);
const sectionRepository = connectionSource.getRepository(Section);
const userTrackRepository = connectionSource.getRepository(UserTrack);
const languageDetailRepository = connectionSource.getRepository(LanguageDetail);
const aboutRepositiory = connectionSource.getRepository(AboutDetail);
const awardRepository = connectionSource.getRepository(Award);
const certificateRepository = connectionSource.getRepository(Certificate);

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

    const education = await connectionSource.manager.find(EducationDetail, {
      where: { user: { id: user.id } },
    });

    const skills = await connectionSource.manager.find(SkillsDetail, {
      where: { user: { id: user.id } },
    });

    const interests = await connectionSource.manager.find(InterestDetail, {
      where: { user: { id: user.id } },
    });

    const about = await aboutRepositiory.findOne({
      where: { user: { id: user.id } },
    });

    const projects = await connectionSource.manager.find(Project, {
      where: { user: { id: user.id } },
    });
    const sections = await connectionSource.manager.find(CustomUserSection, {
      where: { user: { id: user.id } },
    });

    const tracks = await userTrackRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['track'],
    });

    const workExperience = await workExperienceRepository.find({
      where: { user: { id: user.id } },
    });

    const awards = await awardRepository.find({
      where: { user: { id: user.id } },
    });
    const certificates = await certificateRepository.find({
      where: { user: { id: user.id } },
    });
    const track = tracks?.track;

    const reference = await connectionSource.manager.find(ReferenceDetail, {
      where: { user: { id: user.id } },
    });

    const languages = await getAllLanguages(user.id);

    const projectwithImages = await connectionSource.manager.find(Project, {
      where: { user: { id: user.id } },
      relations: ['projectsImages'],
    });
    res.status(200).json({
      user,
      education,
      skills,
      interests,
      about,
      projects,
      workExperience,
      awards,
      certificates,
      sections,
      track,
      reference,
      projectwithImages,
      languages
    });
  } catch (error) {
    return next(error);
  }
};

const getAllPortfolioDetails = async (req: Request, res: Response) => {
  const PortfolioDetails = await portfolioRepository.find();
  return res.json({ PortfolioDetails });
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
      throw new NotFoundError('Portfolio profile details not found');
    }

    const portfolio = await portfolioDetailsRepository.remove(
      portfolioToRemove
    );
    res.status(200).json({
      message: 'Portfolio profile details deleted successfully',
      portfolio,
    });
  } catch (error) {
    return next(error);
  }
};

export { getAllPortfolioDetails, getPortfolioDetails, deletePortfolioDetails };
