import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import {
  parseAsync,
  ErrorMessageOptions,
  TransformErrorParams,
} from "zod-error";

const certificateDataSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).trim(),
  year: z
    .string()
    .min(4, { message: "Year should be a 4-digit number" })
    .optional(),
  organization: z
    .string()
    .min(1, { message: "Organization is required" })
    .optional(),
  url: z.string().url({ message: "Invalid URL format" }).trim().optional(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .optional(),
  userId: z.string().trim(),
  sectionId: z
    .number()
    .int({ message: "Section ID should be an integer" })
    .optional(),
});

// const options: ErrorMessageOptions = {
//   delimiter: {
//     error: " 🔥 ",
//   },
//   transform: (error: TransformErrorParams) => `${error?.errorMessage}`,
// };

async function validateCertificateData(req: Request, res: Response) {
  try {
    const isValidData = await parseAsync(certificateDataSchema, req.body);
    return isValidData;
  } catch (error) {
    const err = new BadRequestError(error.message);
    console.log(err.message);
    res.status(err.statusCode).json({ error: err.message });
  }
}

export { validateCertificateData, certificateDataSchema };
