import { NextFunction, Request, Response } from "express";
import { validate as isUUID } from "uuid";
import { z } from "zod";
import { ErrorMessageOptions, parseAsync } from "zod-error";
import { BadRequestError } from "../middlewares";

function checkNotEmptyString(value, fieldName) {
  if (!value || value.trim().length === 0) {
    throw new BadRequestError(`The '${fieldName}' cannot be an empty string`);
  }
}

const goodStringReg = /[A-Za-z]/


function isYearInRange(year, startYear = 1970, endYear =  new Date().getFullYear()) {
  const currentYear = new Date().getFullYear();
  return year >= startYear && year <= endYear && year <= currentYear;
}


export const CreateEducationDetailDataSchema = z.object({
  degree_id: z.number().nullable(),
  fieldOfStudy: z.string().min(3, "please input a valid field of study"),
  school: z.string().min(3, "Please type in school full name"),
  from: z
    .string()
    .min(4, "Please Select a valid year")
    .max(4, "please select a valid year"),
  description: z.string().optional(),
  to: z
    .string()
    .min(4, "Please Select a valid year")
    .max(7, "please select a valid year"),
  user_id: z.string().refine((value) => isUUID(value), {
    message: "userId has to be a valid UUID",
  }),
});


export const UpdateEducationDetailDataSchema = z.object({
  degree_id: z.number({invalid_type_error: "degree Id must be a number"}).optional().nullable(),
  fieldOfStudy: z.string().optional().refine(val => goodStringReg.test(val), {message: "field of Study must be a string and must not contain any characters"}),
  school: z.string().optional().refine(val => goodStringReg.test(val), {message: "school must be a string and must not contain any characters"}),
  from: z.string().optional(),
  description: z.string().min(5, {message: "Description must have at least minimum characters of 5"}).optional(),
  to: z.string().optional(),
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
  transform: ({ errorMessage, index }) => `${errorMessage}`,
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


      if(!isYearInRange(fromDate)) {
        throw new BadRequestError(
          `The 'from' date should be in range from 1970 - ${new Date().getFullYear()}`
        );
      }

      if(!isYearInRange(toDate)) {
        throw new BadRequestError(
          `The 'to' date should be in range from 1970 - ${new Date().getFullYear()}`
        );
      }
    }

    // Usage:

    // checkNotEmptyString(data.school, "school");
    // checkNotEmptyString(data.description, "description");
    // checkNotEmptyString(data.fieldOfStudy, "fieldOfStudy");

    // Validate date strings in "yy-mm-dd" format
    if (data.from && !validateDateYYMMDD(data.from)) {
      throw new BadRequestError("Invalid 'from' date format");
    }

    if (data.to && !validateDateYYMMDD(data.to)) {
      throw new BadRequestError("Invalid 'to' date format");
    }

    const result = await parseAsync(UpdateEducationDetailDataSchema, data, options);

    const validatedData = result; // Store the validated data in the request object if needed
    console.log(validatedData);
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.log(error.message);
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

export { EducationDetailDataSchema, validateCreateData, validateUpdateData };

