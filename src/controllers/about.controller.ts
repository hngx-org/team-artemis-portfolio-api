import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import { AboutDetail, User, Section } from "../database/entities";
import { connectionSource } from "../database/data-source";

import { NotFoundError, BadRequestError } from '../middlewares';


const aboutRepository = connectionSource.getRepository(AboutDetail);
const userRepository = connectionSource.getRepository(User);
const sectionRepository = connectionSource.getRepository(Section);


export const createOrUpdateAbout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { bio, section_id } = req.body;

        if (!bio) {
            throw new BadRequestError("Bio is required");
        }

        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const section = await sectionRepository.findOne({ where: { id: section_id } });
        if (!section) {
            throw new NotFoundError("Section not found");
        }

        const existingAbout = await aboutRepository.findOne({ where: { user: { id: userId } } });
        let createdAbout
        if (!existingAbout) {
            createdAbout = await aboutRepository.save({
                bio: bio,
                section: section,
                user: user,
            });
        } else {
            await aboutRepository.update({
                id: existingAbout.id,
            }, {
                bio: bio,
                section: section,
                user: user,
            });
            createdAbout = await aboutRepository.findOne({ where: { user: { id: userId } } })
        }

        return res.status(201).json({
            message: "Successfully created about",
            status: "success",
            statusCode: 201,
            createdAbout,
        });
    } catch (err) {
        return next(err);
    }
}

export const getAboutByUserID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.params;

        const user = await userRepository.findOne({ where: { id: user_id } });
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const about = await aboutRepository.findOne({ where: { user: { id: user_id } } });
        if (!about) {
            throw new NotFoundError("About not found");
        }

        return res.status(200).json({
            message: "Successfully retrieved about",
            status: "success",
            statusCode: 200,
            about,
        });
    } catch (err) {
        return next(err);
    }
}




