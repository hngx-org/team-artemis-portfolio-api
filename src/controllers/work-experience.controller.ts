import { RequestHandler } from "express";
import { error, success } from "../utils";
import { deleteWorkExperienceServise } from "../services/work-experience.service";

export const deleteWorkExperience: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as unknown as { id: number };

    const data = await deleteWorkExperienceServise(id);

    success(res, data, "Work Experience Deleted");
  } catch (err) {
    error(res, (err as Error).message);
  }
};
