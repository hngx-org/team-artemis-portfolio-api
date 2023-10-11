import express, { Request, RequestHandler, Response } from "express";
import { z } from 'zod';
import {
  createSkillsService,
  updateSkillsService,
  deleteSkillsService,
  getSkillsService,
} from "../services/skills.service";
import { error, success } from "../utils";

// Schema to validate req body
const skillsSchema = z.object({
  skills: z.array(z.string()),
  sectionId: z.number(),
  userId: z.string(),
});

export const createSkills: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const authorizationHeader = req.header("Authorization");
    const { skills, sectionId, userId } = skillsSchema.parse(req.body);

    const skillData = skills.map((skill) => ({
      skills: skill,
      sectionId,
      userId,
    }));

    const data = await createSkillsService(skillData);
    success(res, data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessages = err.issues.map((issue) => issue.message);
      error(res, errorMessages.join(', '), 400);
    }
    error(res, err instanceof Error ? err.message : 'An error occurred');
  }
};

export const updateSkills: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt((req as any).params.id);
    const { skills, sectionId, userId } = (req as any).body;

    const data = await updateSkillsService(id, { skills, sectionId, userId });
    if (data.successful) {
      success(res, data);
    } else {
      error(res, data.message);
    }
  } catch (err) {
    error(res, (err as Error).message);
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
  _req: Request,
  res: Response
) => {
  try {
    const authorizationHeader = (_req as any).header("Authorization");
    const { userId } = (_req as any).body;
    // Fetch skills for the logged-in user based on their user ID
    const data = await getSkillsService(userId);

    // Send a response with the fetched skills
    success(res, data, "Skills");
  } catch (err) {
    console.error("Error fetching skills:", error);
    error(res, (err as Error).message);
  }
};
