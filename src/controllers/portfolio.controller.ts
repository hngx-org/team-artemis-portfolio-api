import { Request, RequestHandler, Response } from 'express';
import { connectionSource } from '../database/data-source';
import {
  AboutDetail,
  CustomUserSection,
  EducationDetail,
  InterestDetail,
  NotificationSetting,
  PortfolioDetails,
  Project,
  SkillsDetail,
  SocialUser,
  Tracks,
  UserTrack,
  WorkExperienceDetail,
} from '../database/entity/model';
import { User } from '../database/entity/user';
import { error, success } from '../utils';

const userRepository = connectionSource.getRepository(User);
const portfolioRepository = connectionSource.getRepository(PortfolioDetails);
const userTrackRepository = connectionSource.getRepository(UserTrack);
const trackRepository = connectionSource.getRepository(Tracks);

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.json(users);
};

const getUserById = async (req: Request, res: Response) => {
  let tracks: any[] = [];
  try {
    const { userId } = req.params;
    const user = await userRepository.findOne({ where: { id: userId } });
    const portfolio = await portfolioRepository.findOne({
      where: { userId },
    });
    const userTracks = await userTrackRepository
      .createQueryBuilder('userTrack') // Create a query builder for the 'userTrack' entity.
      .innerJoinAndSelect('userTrack.track', 'track') // Perform an inner join with the 'track' entity.
      .where('userTrack.userId = :userId', { userId: userId }) // Filter the results based on a condition.
      .getMany();
    for (let userTrack of userTracks) {
      tracks.push(userTrack.track);
    }
    res.status(200).json({ user, portfolio, tracks });
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
};

const retrievePortfolioController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const user = await connectionSource.manager.find(User, {
      where: { id: userId },
    });

    if (user.length < 1)
      // Add userid validation
      return res
        .status(404)
        .json({ status: 404, message: 'User not found', data: null });

    const sectionModels = {
      work_experience: WorkExperienceDetail,
      education: EducationDetail,
      skill: SkillsDetail,
      interest: InterestDetail,
      about: AboutDetail,
      project: Project,
      contacts: SocialUser,
      tracks: UserTrack,
      settings: NotificationSetting,
      portfolio: PortfolioDetails,
      custom_sections: CustomUserSection,
    };

    let responseObject = { user: user[0] };

    // fetch details with a loop to avoid repetitions
    await Promise.all(
      Object.entries(sectionModels).map(async ([key, value]) => {
        const details = await connectionSource.manager.find(value, {
          where: { userId },
        });
        responseObject = { ...responseObject, [key]: details };
      })
    );

    return success(res, responseObject);
  } catch (err) {
    return error(res, (err as Error).message);
  }
};

export { getAllUsers, getUserById, retrievePortfolioController };
