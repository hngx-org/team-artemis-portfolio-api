import express, { Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { validate as isUUID } from "uuid";
import {
  createSkillsService,
  updateSkillsService,
  deleteSkillsService,
  getSkillsService,
} from "../services/skills.service";
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

// Schema to validate req body
const skillsSchema = z.object({
  skills: z.array(z.string().min(1, {
    message: "Skill has to be at least 1 letter"
  })),
  sectionId: z.number(),
  userId: z.string().refine((val) => isUUID(val), {
    message: "userId has to be a valid UUID",
  }),
});

const updateSkillsSchema = z.object({
  skills: z.string().min(1, {
    message: "Skill has to be at least 1 letter"
  }).optional(),
  sectionId: z.number().optional(),
  userId: z.string().refine((val) => isUUID(val), {
    message: "userId has to be a valid UUID",
  }).optional(),
});

// controller functions
export const createSkills: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.body) {
      throw new BadRequestError("No data to create");
    }

    const { skills, sectionId, userId } = skillsSchema.parse(req.body);

    const existingData = await getSkillsService(userId);
    const existingSkills = existingData.map((record) => record.skills);
    const newSkills = [];

    skills.forEach((skill) => {
      skill = skill.trim().toLowerCase();
      if (!existingSkills.includes(skill) && !newSkills.includes(skill)) {
        newSkills.push(skill);
      }
      console.error(`${skill} already exists`);
    })

    const skillData = newSkills.map((skill) => ({
      skills: skill,
      sectionId,
      userId,
    }));

    const data = await createSkillsService(skillData);
    success(res, data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.issues.map((issue) => issue.message);
      const errors = errorMessages.join("; ");
      throw new BadRequestError(errors);
    }
    throw new InternalServerError("An error occurred");
  }
};

export const updateSkills: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
      throw new BadRequestError("Invalid ID");
    }

    if (!req.body) {
      throw new BadRequestError("No data to update");
    }

    const { skills, sectionId, userId } = updateSkillsSchema.parse(req.body);

    const data = await updateSkillsService(id, { skills, sectionId, userId });
    if (data.successful) {
      success(res, data);
    } else {
      throw new BadRequestError(data.message);
    }
  } catch (err) {
    console.error("Error updating skill: ", err.message);
    throw new InternalServerError("An error occurred");
  }
};

export const deleteSkills: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt((req as any).params.id);

    const data = await deleteSkillsService(id);
    if (data.successful) {
      success(res, data);
    } else {
      error(res, data.message);
    }
  } catch (err) {
    error(res, (err as Error).message);
  }
};

// Controller function to fetch skills for a logged-in user
export const getSkillsDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    // Fetch skills for the logged-in user based on their user ID
    const result = await getSkillsService(userId);

    const data = result.map((record) => ({
      skillId: record["id"],
      skill: record["skills"],
    }));

    // Send a response with the fetched skills
    success(res, data, "Skills");
  } catch (err) {
    console.error("Error fetching skills:", error);
    error(res, err instanceof Error ? err.message : "An error occurred");
  }
};
