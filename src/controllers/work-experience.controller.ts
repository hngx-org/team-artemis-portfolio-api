import { Request, RequestHandler, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { WorkExperienceDetail, Section, User } from "../database/entities";
import { success } from "../utils";

import { NotFoundError, BadRequestError } from "../middlewares";

import {
  validateWorkExperience,
  convertMonthToLongForm,
} from "../middlewares/work-experience.zod";

// Get the repository for the WorkExperienceDetail entity
const workExperienceRepository =
  connectionSource.getRepository(WorkExperienceDetail);
const userRepository = connectionSource.getRepository(User);
const sectionRepository = connectionSource.getRepository(Section);

export const createWorkExperience: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
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
    sectionId,
  } = req.body;

  const userId = req.params.userId || req.body.userId;

  try {
    // change isEmployee to boolean
    const newIsEmployee =
      isEmployee === true ? true : isEmployee === false ? false : null;

    // Set newEndMonth and newEndYear based on newIsEmployee
    const newEndMonth = newIsEmployee === true ? "" : endMonth;
    const newEndYear = newIsEmployee === true ? "" : endYear;

    // check if sectionId is NAN
    if (isNaN(sectionId)) {
      throw new BadRequestError("sectionId must be a number");
    }

    // check if section exists
    const section = await sectionRepository.findOneBy({
      id: sectionId,
    });

    if (!section) {
      throw new NotFoundError("Section not found");
    }

    // check if the user exists
    const user = await userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Validate the request body against the schema
    await validateWorkExperience(req, res, next);
    // convert month to long form
    const convertedStartMonth = convertMonthToLongForm(startMonth);
    const convertedEndMonth = convertMonthToLongForm(newEndMonth);

    const workExperience = new WorkExperienceDetail();
    workExperience.company = company;
    workExperience.role = role;
    workExperience.startMonth = convertedStartMonth;
    workExperience.startMonth = convertedStartMonth;
    workExperience.startYear = startYear;
    workExperience.endMonth = convertedEndMonth;
    workExperience.endYear = newEndYear;
    workExperience.description = description;
    workExperience.isEmployee = newIsEmployee;
    workExperience.user = userId;
    workExperience.section = sectionId;

    await workExperienceRepository.save(workExperience);
    return res.json({
      message: "Added Work Experience Successfully",
      data: workExperience,
      success: true,
    });
  } catch (err) {
    return next(err);
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
      throw new NotFoundError("Work Experience not found");
    }

    // Delete the work experience detail
    const data = await workExperienceRepository.remove(workExperienceToRemove);

    success(res, data, "Work Experience Deleted");
  } catch (err) {
    return next(err);
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
    if (!workExperiences) {
      throw new NotFoundError(
        "No Work Experience was not found in the database"
      );
    }
    res.json({ workExperiences });
  } catch (error) {
    return next(error);
  }
};

export const updateWorkExperience: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const workId = parseInt(req.params.workId);
  try {
    if (!workId) {
      throw new BadRequestError("workId is missing from request params");
    }

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
      throw new BadRequestError("userId is missing from request body");
    }

    if (sectionId === undefined) {
      throw new BadRequestError("sectionId is missing from request body");
    }

    if (!company || !role) {
      throw new BadRequestError("company or role is missing from request body");
    }

    const workExperienceToUpdate = await workExperienceRepository.findOneBy({
      id: workId,
    });

    if (!workExperienceToUpdate) {
      throw new NotFoundError("Work Experience not found");
    }
    // if (endYear && startYear && endYear < startYear) {
    //   throw new BadRequestError("EndYear must be greater than startYear");
    // }

    validateWorkExperience(req, res, next);

    workExperienceToUpdate.company = company;
    workExperienceToUpdate.role = role;
    workExperienceToUpdate.startMonth = startMonth;
    workExperienceToUpdate.startYear = startYear;
    workExperienceToUpdate.endMonth = endMonth;
    workExperienceToUpdate.endYear = endYear;
    workExperienceToUpdate.description = description;
    workExperienceToUpdate.isEmployee = isEmployee;
    workExperienceToUpdate.user = userId;
    workExperienceToUpdate.section = sectionId;

    await workExperienceRepository.save(workExperienceToUpdate);

    return res.json({
      message: "Updated Work Experience Successfully",
      data: workExperienceToUpdate,
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
