import { ZodError, z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import { parseAsync, ErrorMessageOptions } from "zod-error";
import { validate as isUUID } from "uuid";
import { error } from "console";

function checkNotEmptyString(value, fieldName) {
  if (!value || value.trim().length === 0) {
    throw new BadRequestError(`The '${fieldName}' cannot be an empty string`);
  }
}

export const CreateEducationDetailDataSchema = z.object({
  degree_id: z.number().nullable(),
  fieldOfStudy: z.string(),
  school: z.string(),
  from: z.string(),
  description: z.string().optional(),
  to: z.string(),
  user_id: z.string().refine((value) => isUUID(value), {
    message: "userId has to be a valid UUID",
  }),
});

// Custom function to validate date strings in "yy-mm-dd" format
function validateDateYYMMDD(dateString: string) {
  const yearPattern = /^\d{4}$/;
  console.log("dateString", dateString);
  return yearPattern.test(dateString);
}

const EducationDetailDataSchema = z.object({
  fieldOfStudy: z.string().optional(),
  school: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  description: z.string().optional(),
  degree_id: z.number().optional(),
  user_id: z.number().optional(),
  section_id: z.number().optional(),
});

const options: ErrorMessageOptions = {
  delimiter: {
    error: " # ",
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

    // check if the from date is less than the to date
    if (data.from && data.to) {
      const fromDate = parseInt(data.from);
      const toDate = parseInt(data.to);
      if (fromDate > toDate) {
        throw new BadRequestError(
          "The 'from' date cannot be greater than the 'to' date"
        );
      }
    }

    // Usage:

    checkNotEmptyString(data.school, "school");
    checkNotEmptyString(data.description, "description");
    checkNotEmptyString(data.fieldOfStudy, "fieldOfStudy");

    // Validate date strings in "yy-mm-dd" format
    if (data.from && !validateDateYYMMDD(data.from)) {
      throw new BadRequestError("Invalid 'from' date format");
    }

    if (data.to && !validateDateYYMMDD(data.to)) {
      throw new BadRequestError("Invalid 'to' date format");
    }

    const result = await parseAsync(EducationDetailDataSchema, data, options);

    const validatedData = result; // Store the validated data in the request object if needed
    console.log(validatedData);
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    next(new BadRequestError(error.message));
    return;
  }
}

async function validateCreateData(
  data: any,
  user_id: string,
  res: Response,
  next: NextFunction
) {
  try {
    // Validate the data against the schema
    await CreateEducationDetailDataSchema.parseAsync({
      ...data,
      user_id,
    });
  } catch (error) {
    next(new BadRequestError(error.message));
    return;
  }
}

export { validateUpdateData, validateCreateData, EducationDetailDataSchema };
