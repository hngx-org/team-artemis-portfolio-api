import { Request, Response } from "express";
import { connectionSource } from "../database/data-source";
import { User } from "../database/entity/user";
import { UserTrack, PortfolioDetails } from "../database/entity/model";

const userRepository = connectionSource.getRepository(User);
const portfolioRepository = connectionSource.getRepository(PortfolioDetails);
const trackRepository = connectionSource.getRepository(UserTrack);

const getAllUsers = async (req: Request, res: Response) => {
    const users = await userRepository.find();
    res.json(users);
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userRepository.findOne({ where: { id } });
        const portfolio = await portfolioRepository.findOne({ where: { userId: id } });
        res.status(200).json({ user, portfolio });
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
}

export { getAllUsers, getUserById };