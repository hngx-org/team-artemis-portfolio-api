import { Request, Response, NextFunction } from "express";
import { connectionSource } from "../database/data-source";
import { CustomError, NotFoundError, BadRequestError } from "../middlewares";
import { ReferenceDetail, Section, User } from "../database/entities";
import { IReference } from "../interfaces";
import { success, error } from "../utils";
import {
  createReferenceService,
  deleteReferenceDetailService,
  getAllUserReferenceService,
} from "../services/reference.service";


export const createReference = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.userId;

    const { referer, company, position, email, phoneNumber, sectionId } =
      req.body as IReference;

    const data = {
      userId: user_id,
      referer,
      company,
      position,
      email,
      phoneNumber,
      sectionId,
    };

    let d = await createReferenceService(user_id, sectionId, data);

    success(res, d.data, d.message);
  } catch (err) {
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};

export const getAllReference = async (req: Request, res: Response) => {
  try {
    // const references = await referenceRepository.find();
    // res.json({ references });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUserReference = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const d = await getAllUserReferenceService(userId);

    if (!d.successful) {
      return error(res, d.message);
    }

    return success(res, d.data, d.message);
  } catch (err) {
    console.log(err);
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};

export const deleteReferenceDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    const d = await deleteReferenceDetailService(id);

    success(res, {}, d.message);
  } catch (err) {
    console.error("Error deleting reference detail:", error);
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};
