import { RequestHandler } from "express";
import { error, success } from "../utils";
import { connectionSource } from "../database/data-source";
import { WorkExperienceDetail } from "../database/entity/model";

// Get the repository for the WorkExperienceDetail entity
const workExperienceRepository =
  connectionSource.getRepository(WorkExperienceDetail);

export const deleteWorkExperience: RequestHandler = async (req, res, next) => {
  try {
    // Convert the ID to a number
    const id = parseInt(req.params.id);

    // Find the existing work experience detail by ID
    const workExperienceToRemove = await workExperienceRepository.findOneBy({
      id: id,
    });

    // If the work experience detail doesn't exist, return a 404 Not Found
    if (!workExperienceToRemove) {
      return error(res, "Work Experience not found", 404);
    }

    // Delete the work experience detail
    const data = await workExperienceRepository.remove(workExperienceToRemove);

    success(res, data, "Work Experience Deleted");
  } catch (err) {
    console.log(err);
    error(res, (err as Error).message);
  }
};
import * as entities from "../database/entity/model" 
import { Request, Response } from 'express';



class WorkExperienceController {
    static async getWorkExperience(req: Request, res: Response) {
      try {
        const workExperienceRepository = connectionSource.getRepository(WorkExperienceDetail);
        const workExperiences = await workExperienceRepository.find();
        res.json({ workExperiences });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }


export default WorkExperienceController;
