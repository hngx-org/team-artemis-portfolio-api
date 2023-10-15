import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { References } from "../database/entity/model";
import { CustomError, NotFoundError, BadRequestError } from "../middlewares";
import { error, success } from "../utils/response.util";

const referenceRepository = connectionSource.getRepository(References);
export const createReference = async (req: Request, res: Response) => {
  try {
    const validatedData = req.body; // Assuming that the validation middleware stored the validated data
    const userIdFromURL = req.params.userId; // Extract user ID from the URL

    // If the user ID is not provided in the URL, check if it's in the request body
    let userId = userIdFromURL || validatedData.userId;
    // Create a new References object with the validated data
    const reference = new References();
    reference.name = validatedData.name;
    reference.company = validatedData.company;
    reference.position = validatedData.position;
    reference.emailAddress = validatedData.emailAddress;
    reference.phoneNumber = validatedData.phoneNumber;
    reference.userId = userId;

    // Save the reference to the database
    await referenceRepository.save(reference);

    res.status(201).json({ message: "Reference created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllReference = async (req: Request, res: Response) => {
  try {
    const references = await referenceRepository.find();
    res.json({ references });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
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
      message: "Reference detail deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting reference detail:", error);
    next(error);
  }
};

export const getReferenceById = async (req: Request, res: Response) => {
  try {
    const { id }:any = req.params;
    const userRepository = connectionSource.getRepository(References);
    const refByid = await userRepository.findOneBy({
      userId: id,
    });
    if (!refByid) {
      return error(res);
    }
    return success(res, refByid);
  } catch (err) {
    error(res, "invalid userid");
  }
};
export const updateReference = async (req: Request, res: Response) => {
  try {
    const { userid }:any = req.params;
     await connectionSource
      .createQueryBuilder()
      .update(References)
      .set(req.body)
      .where("userId = :id", { id: userid })
      .execute();
      const userRepository = connectionSource.getRepository(References);
      const refByid = await userRepository.findOneBy({
        userId: userid,
      });
    res.send(refByid);
  } catch (err) {
    res.send(err.message);
  }
};
