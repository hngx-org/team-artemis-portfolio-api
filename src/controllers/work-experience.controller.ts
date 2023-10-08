import { Request, RequestHandler, Response } from "express";
import { connectionSource } from "../database/data-source";
import { WorkExperienceDetail } from "../database/entity/model";
import { error, success } from "../utils";

// Get the repository for the WorkExperienceDetail entity
const workExperienceRepository =
  connectionSource.getRepository(WorkExperienceDetail);

export const createWorkExperience: RequestHandler = async (
  req: Request,
  res: Response
) => {
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
    sectionId,
  } = req.body;

  if (!userId) {
    res.statusCode = 400;
    return res.json({ message: "userId is missing from request body" });
  }

  if (sectionId === undefined) {
    res.statusCode = 400;
    return res.json({ message: "sectionId is missing from request body" });
  }

  if (!company || !role) {
    res.statusCode = 400;
    return res.json({
      message: "company or role is missing from request body",
    });
  }

  try {
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
    return res.json({
      message: "Added Work Experience Successfully",
      data: workExperience,
    });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, message: (err as Error).message });
  }
};

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

export const workExperienceController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const workExperienceRepository =
      connectionSource.getRepository(WorkExperienceDetail);
    const workExperiences = await workExperienceRepository.find();
    res.json({ workExperiences });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
