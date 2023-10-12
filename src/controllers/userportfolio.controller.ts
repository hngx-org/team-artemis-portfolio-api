import { Request, Response, RequestHandler } from "express";
import { connectionSource } from "../database/data-source";
import { User } from "../database/entity/user";
import {
  UserTrack,
  PortfolioDetails,
  Tracks,
  AboutDetail,
  EducationDetail,
  InterestDetail,
  Project,
  Section,
  SkillsDetail,
  WorkExperienceDetail,
} from "../database/entity/model";

const userRepository = connectionSource.getRepository(User);
const portfolioRepository = connectionSource.getRepository(PortfolioDetails);
const userTrackRepository = connectionSource.getRepository(UserTrack);
const trackRepository = connectionSource.getRepository(Tracks);

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.status(200).json({ users });
};

const getUserById = async (req: Request, res: Response) => {
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

const getPortfolioDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
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
    res.status(404).json({ message: "Portfolio not found" });
  }
};

const getAllPortfolioDetails = async (req: Request, res: Response) => {
  const PortfolioDetails = await portfolioRepository.find();
  return res.json(PortfolioDetails);
};

export {
  getAllUsers,
  getUserById,
  getPortfolioDetails,
  getAllPortfolioDetails,
};
