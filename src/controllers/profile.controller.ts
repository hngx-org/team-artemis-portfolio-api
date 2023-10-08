import express, { Request, RequestHandler, Response } from "express";
import { error, success } from "../utils";
import { cloudinaryService, uploadProfileImageService } from "../services";

export const uploadProfileImageController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.files) return error(res, "add event image", 400);
    const { service, userId } = req.body;

    const { urls } = await cloudinaryService(req.files, service);
    const data = await uploadProfileImageService(userId, urls);
    return success(res, data, "Profile picture uploaded successfully");
  } catch (err) {
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};
