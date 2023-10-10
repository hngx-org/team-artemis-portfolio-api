import express, { Request, RequestHandler, Response } from "express";
import { error, success } from "../utils";
import { cloudinaryService } from "../services/image-upload.service";
import { connectionSource } from "../database/data-source";
import { Images } from "../database/entity/model";

export const coverphoto: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.files) {
      return error(res, "No files were uploaded", 400);
    }

    const data = await cloudinaryService(req.files, req.body.service);
    const userRepository = connectionSource.getRepository(Images);

    const images = new Images();
    images.url = String(data.urls);
    await userRepository.save(images);

    return success(res, data.urls, "Image uploaded successfully");
  } catch (err) {
    if (err instanceof Error) {
      return error(res, err.message, 500);
    } else {
      return error(res, "An unknown error occurred", 500);
    }
  }
};
