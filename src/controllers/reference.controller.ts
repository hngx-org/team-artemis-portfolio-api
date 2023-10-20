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
  updateReferenced,
} from "../services/reference.service";
const referenceRepository = connectionSource.getRepository(ReferenceDetail);

export const createReference = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.userId;

    const { referer, company, position, email, phoneNumber, sectionId } =
      req.body as IReference;

    if (!isNaN(Number(referer))) {
      return error(res, "Referer should be a string", 422);
    }

    if (!isNaN(Number(company))) {
      return error(res, "Company should be a string", 422);
    }

    if (!isNaN(Number(position))) {
      return error(res, "Position should be a string", 422);
    }

    if (!isNaN(Number(email))) {
      return error(res, "Email should be a string", 422);
    }

    const pattern = /^[a-zA-Z0-9]+$/;

    if (!pattern.test(referer)) {
      return error(res, "Referer should not contain sepecial characters", 422);
    }

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

export const updateReference = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    let fields = Object.keys(req.body);

    let shouldContinue = true;
    let message: string;

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      console.log(field);
      if (field == "sectionId") continue;

      if (!isNaN(Number(req.body[field]))) {
        message = field;
        shouldContinue = false;
      }
    }

    if (!shouldContinue) {
      return error(res, `${message} should be a string`, 422);
    }

    await connectionSource
      .createQueryBuilder()
      .update(ReferenceDetail)
      .set(req.body)
      .where("id = :id", { id: id })
      .execute();

    const userRepository = connectionSource.getRepository(ReferenceDetail);
    const refByid = await userRepository.findOneBy({
      id: id,
    });

    success(res, refByid);
  } catch (err) {
    error(res, "invalid reference id");
  }
};
