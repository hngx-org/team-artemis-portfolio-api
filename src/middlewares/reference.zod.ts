import { object, string, ZodIssue, ZodError,z} from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import { parseAsync, ErrorMessageOptions } from "zod-error";
const regx = new RegExp("[^$@0-9]+");

export const CreateReferenceDetailSchema = object({
  referer: string()
    .min(1, { message: "Name must not be an empty string" })
    .regex(regx, "Name cannot be a number or special character"),

  company: string()
    .min(1, { message: "Company must not be an empty string" })
    .regex(regx, "Company cannot be a number or special character"),

  position: string()
     .regex(regx, "Position cannot be a number or special character")
     .optional(),

  email: string()
    .min(1, { message: "Email address must not be an empty string" })
    .refine((emailAddress) => !!emailAddress, {
      message: "Email address is required in the request body",
    }),

  phoneNumber: string()
    .min(6, "Invalid Phone Number")
    .max(15, "Invalid Phone Number")
    .optional(),

  userId: string()
    .min(1, { message: "User ID must not be an empty string" })
    .optional()
    .nullish(),
});
const name = new RegExp("[^$@0-9]+");
export const updatereferenceschema = z.object({
  referer: string()
    .min(1, { message: "Name must not be an empty string" })
    .regex(name, "name cannot contain number or special character")
    .optional(),

  company: string()
    .min(1, { message: "Company must not be an empty string" })
    .regex(name,"cannot contain special characters")
    .optional(),

  position: string()
    .min(1, { message: "position cannot be an empty string" })
    .regex(name,"cannot contain special characters")
    .optional(),

  email: string().email().optional(),

  phone_number: string()
    .max(15, "Invalid Phone Number!")
    .min(6, "invalid Phone !")
    .optional(),
});

// Custom function to validate email addresses
function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}
async function validateCreateReferenceData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;

    if (data.email && !validateEmail(data.email)) {
      throw new BadRequestError("Invalid email address format");
    }
    // Retrieve the "userId" from request parameters
    let userId = req.params.id;
    if (!userId) {
      userId = req.body.userId;
    }

    // Validate the rest of the data against the schema
    const result = await parseAsync(CreateReferenceDetailSchema, {
      ...data,
      userId,
    });

    // Store the validated data in the request object if needed
    const validatedData = result;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = (error.issues as ZodIssue[]).map(
        (issue) => issue.message
      );
      res.status(400).json({ errors: errorMessages });
    } else {
      next(error);
    }
  }
}

export { validateCreateReferenceData, validateEmail };
