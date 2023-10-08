import express, { Request, RequestHandler, Response } from "express";
import { createSkillsService } from "../services/skills.service";
import { error, success } from "../utils";

export const createSkills: RequestHandler = async (
  _req: Request,
  res: Response
) => {
  try {
    const authorizationHeader = _req.header('Authorization');    
    const { skills, sectionId, userId } = _req.body;

    const skillData = []
    for (const skill of skills) {
      skillData.push({skills: skill, sectionId, userId})
    }
    
    const data =await createSkillsService(skillData);
    success(res, data);
  } catch (err) {
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};

