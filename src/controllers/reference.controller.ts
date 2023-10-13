import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { CreateReferenceDetailSchema } from "../middlewares/reference.zod";
import { References } from "../database/entity/model";
import { Reference } from "../interfaces/reference.interface";
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

const referenceRepository = connectionSource.getRepository(References);
export const createReference = async (req: Request, res: Response) => {
  try {
    const validatedData = req.body; // Assuming that the validation middleware stored the validated data

    // Create a new References object with the validated data
    const reference = new References();
    reference.name = validatedData.name;
    reference.company = validatedData.company;
    reference.position = validatedData.position;
    reference.emailAddress = validatedData.emailAddress;
    reference.phoneNumber = validatedData.phoneNumber;
    reference.userId = validatedData.userId; // Assuming you have the user ID

    // Save the reference to the database
    await referenceRepository.save(reference);

    res.status(201).json({ message: "Reference created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteReferenceDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
      throw new BadRequestError("Invalid ID Format");
    }

    // Find the existing reference detail by ID
    const referenceDetail = await referenceRepository.findOne({
      where: { id },
    });

    if (!referenceDetail) {
      throw new NotFoundError("Reference detail not found");
    }

    await referenceRepository.remove(referenceDetail);

     res.status(200).json({
      message: "Reference detail deleted successfully"  });
  } catch (error) {
    console.error("Error deleting reference detail:", error);
    next(error);
  }
};

