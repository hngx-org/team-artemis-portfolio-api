import * as entities from "../entity/model";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/model";

const userRepository = AppDataSource.getRepository(User);

const getAllUsers = async (req: Request, res: Response) => {
    const users = await userRepository.find();
    res.json(users);
}

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });
    res.json(user);
}

export { getAllUsers, getUserById };