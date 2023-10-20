import { Request, RequestHandler, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { WorkExperienceDetail, Section, User } from "../database/entities";
import { error, success } from "../utils";

import {
  CustomError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  errorHandler,
} from "../middlewares";

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

  console.log(req.body);

  console.log("past here");

  try {
    // change isEmployee to boolean
    req.body.isEmployee =
      req.body.isEmployee === true
        ? true
        : req.body.isEmployee === false
        ? false
        : null;

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
    const convertedEndMonth = convertMonthToLongForm(endMonth);

    console.log("past here too");
    if (endYear < startYear) {
      throw new BadRequestError("EndYear must be greater than startYear");
    }

    console.log("past here too too");
    const workExperience = new WorkExperienceDetail();
    workExperience.company = company;
    workExperience.role = role;
    workExperience.startMonth = convertedStartMonth;
    workExperience.startYear = startYear;
    workExperience.endMonth = convertedEndMonth;
    workExperience.endYear = endYear;
    workExperience.description = description;
    workExperience.isEmployee = isEmployee;
    workExperience.user = userId;
    workExperience.section = sectionId;

    console.log("past here too too toooo");

    await workExperienceRepository.save(workExperience);
    return res.json({
      message: "Added Work Experience Successfully",
      data: workExperience,
    });
  } catch (err) {
    console.log(err);
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

export const updateWorkExperience: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const workId = parseInt(req.params.workId);

  if (!workId) {
    return next(new BadRequestError("workExpId must be provided as a parameter"));
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
    return next(new BadRequestError("userId is missing from the request body"));
  }

  if (sectionId === undefined) {
    return next(new BadRequestError("sectionId is missing from the request body"));
  }

  if (!company || !role) {
    return next(new BadRequestError("company or role is missing from the request body"));
  }

  try {
    const workExperienceToUpdate = await workExperienceRepository.findOneBy({ id: workId });

    if (!workExperienceToUpdate) {
      return next(new NotFoundError("Work Experience not found"));
    }

    // Validate the request body against the schema
    await validateWorkExperience(req, res, next);

    if (endYear && startYear && endYear < startYear) {
      return next(new BadRequestError("EndYear must be greater than startYear"));
    }

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
    });
  } catch (err) {
    next(err);
  }
};
