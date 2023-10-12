import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import {
  parseAsync,
  ErrorMessageOptions,
  TransformErrorParams,
} from "zod-error";

const certificateDataSchema = z.object({
  title: z.string().trim(),
  year: z.string().trim().optional(),
  organization: z.string().trim().optional(),
  url: z.string().url().trim().optional(),
  description: z.string().trim().optional(),
  userId: z.string().uuid().trim(),
  sectionId: z.number().optional(),
});

const options: ErrorMessageOptions = {
  delimiter: {
    error: " 🔥 ",
  },
  transform: (error: TransformErrorParams) => `${error?.errorMessage}`,
};

async function validateUpdateData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await parseAsync(certificateDataSchema, req.body, options);
    next();
  } catch (error) {
    const err = new BadRequestError(error.message);
    console.log(err.message);
    res.status(err.statusCode).json({ error: err.message });
  }
}

export { validateUpdateData, certificateDataSchema };
