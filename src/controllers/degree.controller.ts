import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { Degree } from "../database/entities";
import { DegreeDataSchema } from "../middlewares/degree.zod";
import { DegreeData } from "../interfaces";
import { getDegree, updateDegree } from "../services/degree.service";
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

    const { type }: DegreeData = req.body;

    // Validate the payload against the schema
    DegreeDataSchema.parse({ type });

    if (!type) {
      return res.status(400).json({ error: "No type provided" });
    }

    // Create a new degree instance and save it to the database

    const degreeRepository = connectionSource.getRepository(Degree);
    const degree = degreeRepository.create({ type: type });
    const createdDegree = await degreeRepository.save(degree);

    const createdDegreeString = createdDegree.id.toString();

    return res.status(201).json(createdDegreeString);
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

    const degreeString = degree.data.id.toString();

    return res.status(200).json(degreeString);
  } catch (error) {
    next(error);
  }
};

// endpoint to fetch all degree
export const fetchAllDegree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const degreeRepository = connectionSource.getRepository(Degree);
    const degrees = await degreeRepository.find();

    if (!degrees) {
      throw new NotFoundError("No degrees found!");
    }
    res
      .status(200)
      .json({ message: "degrees gotten successfully!", data: degrees });
  } catch (error) {
    next(error);
  }
};

// endpoint to update a degree

export const updateExisitingDegree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    // Check if ID is valid
    if (isNaN(id)) {
      throw new BadRequestError("Invalid degree ID");
    }

    const degreePayload = req.body;

    const degreeType: string = degreePayload.type;
    // Validate the payload against the schema
    DegreeDataSchema.parse(degreePayload);

    // Call service function to update degree
    const updatedDegree = await updateDegree(id, degreeType);

    res.status(200).json(updatedDegree);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
      next(error);
    }
  }
};

const deleteDegree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const degreeId: number = parseInt(req.params.degreeId);
    const degreeRepository = connectionSource.getRepository(Degree);

    if (!degreeId) {
      throw new NotFoundError("No degrees provided!");
    }

    const degree = await degreeRepository.findOne({
      where: {
        id: degreeId,
      },
    });

    if (!degree) {
      throw new NotFoundError("No degrees found!");
    }

    await degreeRepository.remove(degree);

    const response = {
      message: "Degree deleted successfully",
      status: "Success",
    };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
export { createDegreeController, deleteDegree };
