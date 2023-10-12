import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { Degree } from "../database/entity/model";
import { DegreeDataSchema } from "../middlewares/degree.zod";
import { getDegree } from "../services/degree.service";
import { z } from "zod";
import { NotFoundError } from "../middlewares/index";
// Controller function to create a degree
const createDegreeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { type } = req.body as DegreeData

    const { type } = req.body;
    const degreeType: string = type;

    // Validate the payload against the schema
    DegreeDataSchema.parse({ type });

    if (!type) {
      return res.status(400).json({ error: "No type provided" });
    }

    // Create a new degree instance and save it to the database

    const degreeRepository = connectionSource.getRepository(Degree);
    const degree = degreeRepository.create({ type: degreeType });
    const createdDegree = await degreeRepository.save(degree);

    return res.status(201).json(createdDegree);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
      next(error);
    }
  }
};

// endpoint to fetch a single degree by id
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

// endpoint to fetch all degree
export const fetchAllDegre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const degreeRepository = connectionSource.getRepository(Degree);
    const degrees = await degreeRepository.find();

    if (!degrees) {
      throw new NotFoundError("No degrees found");
    }
    res
      .status(200)
      .json({ message: "degrees gotten successfully", data: degrees });
  } catch (error) {
    next(error);
  }
};

export { createDegreeController };
