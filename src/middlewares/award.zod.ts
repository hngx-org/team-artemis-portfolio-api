import { ZodError, z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import { parseAsync, ErrorMessageOptions } from "zod-error";
import { validate as isUUID } from "uuid";

export const CreateAwardDataSchema = z.object({
  title: z.string(),
  year: z.string(),
  presented_by: z.string(),
  url: z.string().optional(),
  userId: z.string().refine((value) => isUUID(value), {
    message: "userId has to be a valid UUID",
  }),
});

export const UpdateAwardDataSchema = z.object({
  title: z.string(),
  year: z.string(),
  presented_by: z.string(),
  url: z.string().optional(),
  userId: z.string().refine((value) => isUUID(value), {
    message: "userId has to be a valid UUID",
  }),
});

// Custom function to validate date strings in "yyyy" format
function validateDateYYYY(dateString: string) {
  const datePattern = /^\d{4}$/;
  return datePattern.test(dateString);
}

const options: ErrorMessageOptions = {
  delimiter: {
    error: " 🔥 ",
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
};

async function validateCreateAwardData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;

    // Validate date strings in "yy-mm-dd" format
    if (data.year && !validateDateYYYY(data.year)) {
      const err = new BadRequestError(
        "Invalid 'year' date format, it must be 'yyyy' "
      );
      return res.status(err.statusCode).json({ error: err.message });
    }

    // Retrieve the "userId" from request parameters
    const userId = req.params.userId;

    // Validate the rest of the data against the schema
    const result = await parseAsync(CreateAwardDataSchema, {
      ...data,
      userId,
      options,
    });

    // Store the validated data in the request object if needed
    const validatedData = result;
    console.log(validatedData);
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    const err = new BadRequestError(error.message);
    console.log(err.message);
    res.status(err.statusCode).json({ error: err.message });
  }
}

async function validateUpdateAwardData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;

    // Validate date strings in "yyyy" format
    if (data.year && !validateDateYYYY(data.year)) {
      const err = new BadRequestError(
        "Invalid 'year' date format, it must be 'yyyy'"
      );
      return res.status(err.statusCode).json({ error: err.message });
    }

    // Validate the data against the schema
    const result = await parseAsync(UpdateAwardDataSchema, data, options);

    const validatedData = result;
    console.log(validatedData);
    next();
  } catch (error) {
    const err = new BadRequestError(error.message);
    console.error(err.message);
    res.status(err.statusCode).json({ error: err.message });
  }
}
export { validateCreateAwardData, validateUpdateAwardData };
