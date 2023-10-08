import express, { Request, RequestHandler, Response } from "express";
import { createSkillsService } from "../services/skills.service";
import { error, success } from "../utils";

export const createSkills: RequestHandler = async (
  _req: Request,
  res: Response
) => {
  try {
    const authorizationHeader = _req.header('Authorization');    
    const skillData = _req.body
    const requiredData: string[] = ["skills", "userId", "sectionId"]
    // if (!authorizationHeader) {
    //     const errorMessage = `unauthorized`;
    //       return error(res, errorMessage, 401);
    //   }

    // const token = authorizationHeader.split(" ")[1]  

    for (const field of requiredData) {
        if (!(field in skillData)) {
          const errorMessage = `Missing required field: ${field}`;
          return error(res, errorMessage, 400);
        }
      }
    
    const data = createSkillsService(skillData);
    success(res, data);
  } catch (err) {
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};
