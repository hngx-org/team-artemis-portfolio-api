import express, { Request, RequestHandler, Response } from "express";
import {
  createSkillsService,
  updateSkillsService,
  deleteSkillsService,
} from "../services/skills.service";
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

export const updateSkills: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { skills, sectionId, userId } = req.body;

    const data = await updateSkillsService(id, { skills, sectionId, userId });
    if (data.successful) {
      success(res, data);
    } else {
      error(res, data.message);
    }
  } catch (err) { 
    error(res, (err as Error).message);
  }
}

export const deleteSkills: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);

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

