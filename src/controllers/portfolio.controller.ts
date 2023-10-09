import { Request, RequestHandler, Response } from "express";
import { connectionSource } from "../database/data-source";
import { User } from "../database/entity/user";
import { UserTrack, PortfolioDetails } from "../database/entity/model";

import {
  AboutDetail,
  EducationDetail,
  InterestDetail,
  Project,
  Section,
  SkillsDetail,
  WorkExperienceDetail,
} from '../database/entity/model'
import { error, success } from '../utils'

const userRepository = connectionSource.getRepository(User);
const portfolioRepository = connectionSource.getRepository(PortfolioDetails);
const trackRepository = connectionSource.getRepository(UserTrack);

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.json(users);
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });
    const portfolio = await portfolioRepository.findOne({
      where: { userId: id },
    });
    res.status(200).json({ user, portfolio });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

const retrievePortfolioController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId
    const workExperience = await connectionSource.manager.find(
      WorkExperienceDetail,
      { where: { userId } }
    )

    const education = await connectionSource.manager.find(EducationDetail, {
      where: { userId },
    })

    const skills = await connectionSource.manager.find(SkillsDetail, {
      where: { userId },
    })

    const interests = await connectionSource.manager.find(InterestDetail, {
      where: { userId },
    })

    const aboutMe = await connectionSource.manager.find(AboutDetail, {
      where: { userId },
    })

    const projects = await connectionSource.manager.find(Project, {
      where: { userId },
    })

    const sections = await connectionSource.manager.find(Section)

    return success(res, {
      workExperience,
      education,
      projects,
      skills,
      interests,
      aboutMe,
      sections,
    })
  } catch (err) {
    return error(res, (err as Error).message)
  }
}


export { getAllUsers, getUserById, retrievePortfolioController }
