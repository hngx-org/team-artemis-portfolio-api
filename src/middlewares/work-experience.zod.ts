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
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
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
  endMonth: z.string(),
  endYear: z.string(),
  description: z.string(),
  isEmployee: z.boolean(),
});

// convertMonthToLongForm function
function convertMonthToLongForm(month: string) {
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

async function validateWorkExperience(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    console.log("here");
    if (!req.body) {
      throw new BadRequestError("Missing request body");
    }

    const data = req.body;

    // check if the from date is less than the to date
    if (data.startYear && data.endYear) {
      const fromDate = parseInt(data.startYear);
      const toDate = parseInt(data.endYear);
      if (fromDate > toDate) {
        throw new BadRequestError(
          "The 'from' date cannot be greater than the 'to' date"
        );
      }
    }

    if (data.startMonth) {
      // Convert to title case (capitalizing the first letter of each word)
      data.startMonth = data.startMonth
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

      // Check if the input matches a short form month, and convert if necessary
      if (shortToLongMonths[data.startMonth]) {
        data.startMonth = shortToLongMonths[data.startMonth];
        console.log("here 1");
      }
    }

    if (data.endMonth) {
      // Convert to title case
      data.endMonth = data.endMonth
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

      // Check if the input matches a short form month, and convert if necessary
      if (shortToLongMonths[data.endMonth]) {
        data.endMonth = shortToLongMonths[data.endMonth];
      }
    }

    // Check if startMonth and endMonth are valid (full names or abbreviations)
    if (data.startMonth && !validMonths.includes(data.startMonth)) {
      throw new BadRequestError("Invalid 'startMonth' value");
    }

    if (data.endMonth && !validMonths.includes(data.endMonth)) {
      throw new BadRequestError("Invalid 'endMonth' value");
    }

    // Validate date strings in "yy-mm-dd" format
    if (data.startYear && !validateDateYYMMDD(data.startYear)) {
      throw new BadRequestError("Invalid 'start Year' date format");
    }

    if (data.endYear && !validateDateYYMMDD(data.endYear)) {
      throw new BadRequestError("Invalid 'to' date format");
    }

    console.log(data);
    console.log("here 000000");

    // check if fields are empty
    checkNotEmptyString(data.company, "company");
    console.log("here 111111");
    checkNotEmptyString(data.role, "role");
    console.log("here 222222");
    checkNotEmptyString(data.startYear, "startYear");
    console.log("here 444444");
    checkNotEmptyString(data.endYear, "endYear");
    console.log("here 666666");
    checkNotEmptyString(data.description, "description");
    console.log("here 777777");

    const result = await parseAsync(workExperienceSchema, req.body, options);

    const validatedData = result; // Store the validated data in the request object if needed
    console.log(validatedData);
  } catch (error) {
    next(new BadRequestError(error.message));
    return;
  }
}

export { validateWorkExperience, workExperienceSchema, convertMonthToLongForm };
