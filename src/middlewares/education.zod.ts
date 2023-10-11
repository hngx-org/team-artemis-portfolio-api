import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import { parseAsync, ErrorMessageOptions } from "zod-error";

const EducationDetailDataSchema = z.object({
  fieldOfStudy: z.string().optional(),
  school: z.string().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
  description: z.string().optional(),
  degreeId: z.number().optional(),
  userId: z.number().optional(),
  sectionId: z.number().optional(),
});

const options: ErrorMessageOptions = {
  delimiter: {
    error: " 🔥 ",
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
};

async function validateUpdateData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;

    // Convert date strings to Date objects
    if (data.from) {
      data.from = new Date(data.from);
    }

    if (data.to) {
      data.to = new Date(data.to);
    }
    const result = await parseAsync(EducationDetailDataSchema, data, options);

    const validatedData = result; // Store the validated data in the request object if needed
    console.log(validatedData);
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    const err = new BadRequestError(error.message);
    console.log(err.message);
    res.status(err.statusCode).json({ error: err.message });
  }
}

export { validateUpdateData, EducationDetailDataSchema };
