import { Request, RequestHandler, Response } from 'express';
import { connectionSource } from '../database/data-source';
import { WorkExperienceDetail } from '../database/entity/model';
import { error, success } from '../utils';

const workExperienceRepository = connectionSource.getRepository(WorkExperienceDetail);


export const createWorkExperience: RequestHandler = async (req: Request, res: Response) => {
    const { 
        company, 
        role, 
        startMonth, 
        startYear,
        endMonth,
        endYear, 
        description, 
        isEmployee,
        userId, 
        sectionId
    } = req.body;

    const workExperience = new WorkExperienceDetail();
    workExperience.company = company;
    workExperience.role = role;
    workExperience.startMonth = startMonth;
    workExperience.startYear = startYear;
    workExperience.endMonth = endMonth;
    workExperience.endYear = endYear;
    workExperience.description = description;
    workExperience.isEmployee = isEmployee;
    workExperience.userId = userId;
    workExperience.sectionId = sectionId;

    try {
        await workExperienceRepository.save(workExperience);
        return success(res, workExperience, "Added Work Experience Successfully")
    } catch (err) {
        error(err, (err as Error).message)
    }
};
