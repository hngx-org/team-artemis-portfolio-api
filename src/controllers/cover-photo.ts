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
    if (!req.files) return error(res, "add event image", 400);

    const data = await cloudinaryService(req.files, req.body.service);
    const userRepository = connectionSource.getRepository(Images);

    const images = new Images();
    images.url = String(data.urls);
    await userRepository.save(images);

    return success(res, data.urls, data.message);
  } catch (err) {
    error(res, (err as Error).message); // Use type assertion to cast 'err' to 'Error' type
  }
};
