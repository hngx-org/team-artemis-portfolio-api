import { ZodError, z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import { parseAsync, ErrorMessageOptions } from "zod-error";
import { validate as isUUID } from "uuid";

export const CreateEducationDetailDataSchema = z.object({
  degreeId: z.number(),
  fieldOfStudy: z.string(),
  school: z.string(),
  from: z.string(),
  description: z.string().optional(),
  to: z.string(),
  userId: z.string().refine((value) => isUUID(value), {
    message: "userId has to be a valid UUID",
  }),
  sectionId: z.number(),
});

// Custom function to validate date strings in "yy-mm-dd" format
function validateDateYYMMDD(dateString: string) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(dateString);
}

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
    console.log("starting validate");

    if (!req.body) {
      throw new BadRequestError("Missing request body");
    }

    // Validate date strings in "yy-mm-dd" format
    if (data.from && !validateDateYYMMDD(data.from)) {
      throw new BadRequestError("Invalid 'from' date format");
    }

    if (data.to && !validateDateYYMMDD(data.to)) {
      throw new BadRequestError("Invalid 'to' date format");
    }

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
    return res.status(err.statusCode).json({ message: err.message });
  }
}

async function validateCreateData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;

    // Validate date strings in "yy-mm-dd" format
    if (data.from && !validateDateYYMMDD(data.from)) {
      throw new BadRequestError("Invalid 'from' date format");
    }

    if (data.to && !validateDateYYMMDD(data.to)) {
      throw new BadRequestError("Invalid 'to' date format");
    }

    // Retrieve the "userId" from request parameters
    const userId = req.params.id;

    // Validate the rest of the data against the schema
    const result = await parseAsync(CreateEducationDetailDataSchema, {
      ...data,
      userId,
    });

    // Store the validated data in the request object if needed
    const validatedData = result;
    console.log(validatedData);
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    throw new BadRequestError(error.message);
  }
}

export { validateUpdateData, validateCreateData, EducationDetailDataSchema };
