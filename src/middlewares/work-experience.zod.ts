import { ZodError, boolean, number, object, string, z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import { parseAsync, ErrorMessageOptions } from "zod-error";

// Custom function to validate date strings in "yy-mm-dd" format
function validateDateYYMMDD(dateString: string) {
  const yearPattern = /^\d{4}$/;
  console.log("dateString", dateString);
  return yearPattern.test(dateString);
}

function checkNotEmptyString(value, fieldName) {
  if (!value || value.trim().length === 0) {
    throw new BadRequestError(`The '${fieldName}' cannot be an empty string`);
  }
}

const options: ErrorMessageOptions = {
  delimiter: {
    error: " # ",
  },
  transform: ({ errorMessage, index }) => `${errorMessage}`,
};

const validMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortToLongMonths = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

const workExperienceSchema = object({
  company: z.string(),
  role: z.string(),
  startMonth: z.string(),
  startYear: z.string(),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
  description: z.string(),
  isEmployee: z.boolean(),
});

// convertMonthToLongForm function
function convertMonthToLongForm(month: string) {
  // Convert to title case (capitalizing the first letter of each word)
  const formattedMonth = month
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // Check if the input matches a short form month, and convert if necessary
  if (shortToLongMonths[formattedMonth]) {
    return shortToLongMonths[formattedMonth];
  }

  // If it's not a short form, return the original input
  return formattedMonth;
}

// Helper function to convert a month to title case and validate it
function processAndValidateMonth(data, key, errors) {
  if (data[key]) {
    // Convert to title case
    data[key] = data[key]
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    // Check if the input matches a short form month, and convert if necessary
    if (shortToLongMonths[data[key]]) {
      data[key] = shortToLongMonths[data[key]];
    }

    if (!validMonths.includes(data[key])) {
      errors.push(`Invalid '${key}' value`);
    }
  }
}

// Helper function to validate date format
function validateDate(data, key, errors) {
  if (data[key] && !validateDateYYMMDD(data[key])) {
    errors.push(`Invalid '${key}' date format`);
  }
}

async function validateWorkExperience(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = [];
  try {
    if (!req.body) {
      errors.push("Missing request body");
    }

    const data = req.body;

    processAndValidateMonth(data, "startMonth", errors);
    validateDate(data, "startYear", errors);

    // Check if endMonth and endYear are not empty
    if (data.endMonth !== "" && data.endYear !== "") {
      processAndValidateMonth(data, "endMonth", errors);
      validateDate(data, "endYear", errors);
    }

    // check if fields are empty
    checkNotEmptyString(data.company, "company");
    checkNotEmptyString(data.role, "role");
    checkNotEmptyString(data.description, "description");

    const result = await parseAsync(workExperienceSchema, req.body, options);

    const validatedData = result; // Store the validated data in the request object if needed
  } catch (error) {
    errors.push(error.message);
  }

  if (errors.length > 0) {
    // If there are errors in the array, pass them to the error handler
    next(new BadRequestError(errors.join(", ")));
    return;
  }
}

export { validateWorkExperience, workExperienceSchema, convertMonthToLongForm };
