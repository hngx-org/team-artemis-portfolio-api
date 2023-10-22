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
  Images,
  ProjectsImage,
} from '../database/entities';
import { NotFoundError, BadRequestError } from '../middlewares/index';
import { success } from '../utils';

const portfolioDetailsRepository =
  connectionSource.getRepository(PortfolioDetail);
const portfolioRepository = connectionSource.getRepository(PortfolioDetail);
const userRepository = connectionSource.getRepository(User);
const workExperienceRepository =
  connectionSource.getRepository(WorkExperienceDetail);
const imageRepository = connectionSource.getRepository(Images);
const referenceRepository = connectionSource.getRepository(ReferenceDetail);
const projectRepository = connectionSource.getRepository(Project);
const sectionRepository = connectionSource.getRepository(Section);
const userTrackRepository = connectionSource.getRepository(UserTrack);
const languageDetailRepository = connectionSource.getRepository(LanguageDetail);
const aboutRepositiory = connectionSource.getRepository(AboutDetail);
const awardRepository = connectionSource.getRepository(Award);
const certificateRepository = connectionSource.getRepository(Certificate);
const projectImageRepository = connectionSource.getRepository(ProjectsImage);
const contactsRepository = connectionSource.getRepository(SocialUser);

export interface UpdatePortfolioDetailsDTO {
  name?: string;
  location?: string;
  country?: string;
}

const getPortfolioDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { userId } = req.params;
    const { slug } = req.params;
    // if (!userId || !isValidUUID(`${userId}`)) {
    //   throw new BadRequestError(`${userId} is not a valid UUID`);
    // }

    const user = await userRepository.findOne({
      // where: { id: userId },
      where: { slug },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'profilePic',
        'profileCoverPhoto',
        'phoneNumber',
        'location',
        'username',
        'country',
        'slug',
      ],
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const allBadges = await connectionSource.manager.query(
      `SELECT badge_id FROM "user_badge" WHERE "user_id" = '${user.id}' ORDER BY created_at DESC`
    );
    let badges = [];
    if (allBadges.length > 0) {
      const badgeIds = allBadges?.map((badge) => badge.badge_id) || [];

      badges = await connectionSource.manager.query(
        `SELECT id, name, badge_image  FROM "skill_badge" WHERE "id" IN (${badgeIds.join(
          ','
        )})`
      );
    }

    const educationPromise = connectionSource.manager.find(EducationDetail, {
      where: { user: { id: user.id } },
      relations: ['degree'],
    });

    const skillsPromise = connectionSource.manager.find(SkillsDetail, {
      where: { user: { id: user.id } },
    });

    const interestsPromise = connectionSource.manager.find(InterestDetail, {
      where: { user: { id: user.id } },
    });

    const aboutPromise = aboutRepositiory.findOne({
      where: { user: { id: user.id } },
    });

    const allProjectsPromise = connectionSource.manager.find(Project, {
      where: { user: { id: user.id } },
      relations: ['projectsImages'],
    });

    const sectionsPromise = connectionSource.manager.find(CustomUserSection, {
      where: { user: { id: user.id } },
    });

    const tracksPromise = userTrackRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['track'],
    });

    const workExperiencePromise = workExperienceRepository.find({
      where: { user: { id: user.id } },
    });

    const awardsPromise = awardRepository.find({
      where: { user: { id: user.id } },
    });

    const certificatesPromise = certificateRepository.find({
      where: { user: { id: user.id } },
    });

    const referencePromise = connectionSource.manager.find(ReferenceDetail, {
      where: { user: { id: user.id } },
    });

    const contactsPromise = contactsRepository.find({
      where: { user: { id: user.id } },
    });
    const portfolioPromise = portfolioRepository.findOne({
      where: { user: { id: user.id } },
    });

    const languageObject = await connectionSource.manager.find(LanguageDetail, {
      where: { user: { id: user.id } },
      relations: ['language', 'user'],
    });
    const languages = languageObject.map((language) => ({
      id: language.id,
      userId: language.user.id,
      language: language.language.name,
      section: 24,
    }));

    try {
      const [
        education,
        skills,
        interests,
        about,
        allProjects,
        sections,
        tracks,
        workExperience,
        awards,
        certificates,
        reference,
        contacts,
        portfolio,
      ] = await Promise.all([
        educationPromise,
        skillsPromise,
        interestsPromise,
        aboutPromise,
        allProjectsPromise,
        sectionsPromise,
        tracksPromise,
        workExperiencePromise,
        awardsPromise,
        certificatesPromise,
        referencePromise,
        contactsPromise,
        portfolioPromise,
      ]);

      const interestArray = interests[0]?.interest?.split(','); //convert interest to Array of interests

      const imagePromises = allProjects.map(async (project) => {
        const imageUrlsPromises = project?.projectsImages?.map(
          async (image) => {
            const imageEntity = await projectImageRepository.findOne({
              where: { id: image.id },
              relations: ['image'],
            });

            return imageEntity ? imageEntity.image.url : null;
          }
        );
        const imageUrls = await Promise.all(imageUrlsPromises);
        return {
          ...project,
          projectsImages: imageUrls,
          thumbnail: imageUrls[0],
        };
      });

      const projects = await Promise.all(imagePromises);

      const track = tracks?.track;

      return success(res, {
        user,
        portfolio,
        education,
        skills,
        interests,
        interestArray,
        about,
        projects,
        workExperience,
        awards,
        certificates,
        sections,
        tracks: track,
        reference,
        languages,
        contacts,
        badges,
      });
    } catch (error) {
      return next(error);
    }
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
