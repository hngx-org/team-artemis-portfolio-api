import { Response } from "express";

export const success = (
  res: Response,
  data: any,
  message: string = "Success"
) => {
  return res.status(200).json({ success: true, message, data });
};

export const error = (
  res: Response,
  message: string = "Error",
  statusCode: number = 404
) => {
  return res
    .status(statusCode)
    .json({ success: false, message, data: null });
};