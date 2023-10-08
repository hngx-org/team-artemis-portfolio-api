import { Request, RequestHandler, Response } from 'express';
import { connectionSource } from '../database/data-source';
import { WorkExperienceDetail } from '../database/entity/model';
//import { error, success } from '../utils';



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
    
    if(!userId) {
        res.statusCode = 400;
        return res.json({ message: "userId is missing from request body" })
    }

    if (sectionId === undefined) {
        res.statusCode = 400;
        return res.json({ message: "sectionId is missing from request body" })
    }

    if (!company || !role) {
        res.statusCode = 400;
        return res.json({ message: "company or role is missing from request body" })
    }
    
    try {
        const workExperienceRepository = connectionSource.getRepository(WorkExperienceDetail);
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

        await workExperienceRepository.save(workExperience);
        return res.json({ message: "Added Work Experience Successfully", data: workExperience })
    } catch (err) {
        res.statusCode = 500;
        res.json({ error: err, message: (err as Error).message })
    }
};
