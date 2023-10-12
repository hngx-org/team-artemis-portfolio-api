import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { Degree } from "../database/entity/model";
import { getDegree } from "../services/degree.service";

export const fetchDegree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if there is id
    // pass the id to the service
    // return degreee to the client

    const id = parseInt(req.params.id);
    const degree = await getDegree(id);

    return res.status(200).json(degree);
  } catch (error) {
    next(error);
  }
};
