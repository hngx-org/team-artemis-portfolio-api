import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { Degree } from "../database/entity/model";
import { DegreeDataSchema } from "../middlewares/degree.zod";
import { z } from "zod";

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

export { createDegreeController };
