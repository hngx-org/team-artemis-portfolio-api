import { Request, RequestHandler, Response } from "express";
import { connectionSource } from "../database/data-source";
import { User } from "../database/entity/user";
import { UserTrack, PortfolioDetails } from "../database/entity/model";

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

// deleting portfolio by id endpoint

const deletePortfolio: RequestHandler = async (req: Request, res: Response) => {
  try {
    // convert the id to number
    const id = parseInt(req.params.id);

    // find the porfolio by id
    const portfolioToRemove = await portfolioRepository.findOneBy({ id: id });

    // return error if porfolio is not found
    if (!portfolioToRemove) {
      return res.status(404).json({ error: "Portfolio not found!" });
    }

    // delete the porfolio

    const portfolio = await portfolioRepository.remove(portfolioToRemove);
    res
      .status(200)
      .json({ message: "Portfolio deleted successfully", portfolio });
  } catch (error) {
    res.status(500).json(error as Error);
  }
};

export { getAllUsers, getUserById, deletePortfolio };
