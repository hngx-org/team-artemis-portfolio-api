import { object, string, z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import { parseAsync, ErrorMessageOptions } from "zod-error";

// Custom function to validate date strings in "yy-mm-dd" format
function validateDateYYMMDD(dateString: string) {
  const yearPattern = /^\d{4}$/;
  return yearPattern.test(dateString);
}

function checkNotIntegerString(value: any, fieldName: string) {
  const trimmedValue = value.trim();

  if (
    typeof value !== "string" ||
    trimmedValue === "" ||
    !isNaN(Number(trimmedValue))
  ) {
    throw new BadRequestError(`The '${fieldName}' must be a string`);
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

const specialCharsPattern = /[&-]/;

const stringValidator = z
  .string()
  .min(3)
  .refine((value) => {
    return /^[A-Za-z\s&-]*[A-Za-z0-9\s&-]*$/.test(value);
  });

const workExperienceSchema = object({
  company: stringValidator,
  role: stringValidator,
  startMonth: z.string(),
  startYear: z.string(),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
  description: z.string().min(13),
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
    if (data) {
      const fields = ["company", "role", "description"];

      fields.forEach((field) => {
        if (!data[field]) {
          errors.push(`Missing or empty value for ${field}`);
        } else {
          const text = data[field].toString();

          if (text.trim() === "") {
            errors.push(`Empty input for ${field}`);
          }

          if (text[0] && text[0].match(/\d/)) {
            errors.push(`Invalid input for ${field}`);
          }
        }
      });
    }

    processAndValidateMonth(data, "startMonth", errors);
    validateDate(data, "startYear", errors);

    // Check if endMonth and endYear are not empty
    if (data.endMonth !== "" && data.endYear !== "") {
      processAndValidateMonth(data, "endMonth", errors);
      validateDate(data, "endYear", errors);
    }
    // Function to get the numeric representation of a month
    const getMonthNumber = (month: string): number => {
      const monthIndex = validMonths.indexOf(month);
      return monthIndex !== -1 ? monthIndex + 1 : -1;
    };

    // Check if startYear and endYear are not greater than the current year
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    if (data.startYear) {
      const startYear = parseInt(data.startYear);
      if (
        startYear > currentYear ||
        (startYear === currentYear &&
          getMonthNumber(data.startMonth) > currentMonth)
      ) {
        errors.push("Start date cannot be in the future");
      }
    }

    //   check if end year is greater than start year
    if (data.endYear && data.startYear) {
      const startYear = parseInt(data.startYear);
      const endYear = parseInt(data.endYear);
      if (endYear < startYear && data.isEmployee === false) {
        errors.push("End year cannot be less than start year");
      } else if (
        endYear === startYear &&
        getMonthNumber(data.endMonth) < getMonthNumber(data.startMonth)
      ) {
        errors.push(
          "End month must be greater than or equal to start month when end year is the same as start year"
        );
      }
    }
    if (data.endYear) {
      const endYear = parseInt(data.endYear);
      if (endYear > currentYear) {
        errors.push("End year cannot be in the future");
      } else if (
        endYear === parseInt(data.startYear) &&
        getMonthNumber(data.endMonth) < getMonthNumber(data.startMonth)
      ) {
        errors.push(
          "End month must be greater than or equal to start month when end year is the same as start year"
        );
      }
    }

    try {
      const result = await parseAsync(workExperienceSchema, data, options);
      const validatedData = result; // Store the validated data in the request object if needed
    } catch (zodError) {
      errors.push(zodError.message);
    }
  } catch (error) {
    errors.push(error.message);
  }

  if (errors.length > 0) {
    // If there are errors in the array, pass them to the error handler
    throw new BadRequestError(errors.join(", "));
  }
}

export { validateWorkExperience, convertMonthToLongForm };
