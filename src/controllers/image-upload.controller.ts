import express, { Request, RequestHandler, Response } from "express";
import { error, success } from "../utils";
import { cloudinaryService } from "../services/image-upload.service";

export const uploadImageController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.files) return error(res, "add event image", 400);

    if (req.files.length as number > 10) return error(res, "You can only upload a maximum of 10 images at a time", 400);

    const data = await cloudinaryService(req.files, req.body.service);
    return success(res, data.urls, data.message);
  } catch (err) {
    error(res, (err as Error).message);
  }
};
