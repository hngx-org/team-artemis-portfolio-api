import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import {
  createAboutService,
  deleteAboutService,
  getAboutByIdService,
  updateAboutService,
} from "../services/about.service";
import { NotFoundError, BadRequestError } from "../middlewares";
import {
  ValidateCreateAbout,
  ValidateUpdateAbout,
  validateAboutId,
  validateUserId,
} from "../middlewares/about.zod";

// endpoint to create about details

export const createAbout: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { bio, section_id } = req.body;

    const payload = { bio, section_id };

    await validateUserId(userId)

    const isValid = await ValidateCreateAbout(payload);
    if (!isValid) {
      throw new BadRequestError("Validation error");
    }

    const about = await createAboutService(userId, section_id, bio);

    return res.status(201).json({
      message: "About details successfully created.",
      status: "Success",
      statusCode: 201,
      about,
    });
  } catch (err) {
    return next(err);
  }
};

// ednpoint to update about details

export const updateAbout: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const { bio, section_id } = req.body;

    const data = {
      bio,
      section_id,
    };

    await validateAboutId(id)

    const isValid = await ValidateUpdateAbout(data);
    if (!isValid) {
      throw new BadRequestError("dd");
    }

    const about = await updateAboutService(id, section_id, bio);
    res.status(200).json({
      message: "About details successfully updated.",
      status: "Success",
      statusCode: 200,
      about,
    });
  } catch (err) {
    console.error("Error:", err);
    return next(err);
  }
};

// endpoint to get about details by id

export const getAboutByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    await validateUserId(userId);
    const about = await getAboutByIdService(userId);

    return res.status(200).json({
      message: "About details successfully retrieved.",
      status: "Success",
      statusCode: 200,
      about,
    });
  } catch (err) {
    return next(err);
  }
};

// endpoint to delete about details

export const deleteAbout: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("q");
  try {
    const id = parseInt(req.params.id);
    await validateAboutId(id);
    const result = await deleteAboutService(id);

    return res.status(200).json({
      message: "About details deleted successfully.",
      status: "Success",
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};
