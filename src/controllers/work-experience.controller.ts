import * as entities from "../database/entity/model" 
import { Request, Response } from 'express';
import {WorkExperienceDetail} from '../database/entity/model'
import { connectionSource } from '../database/data-source';


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
