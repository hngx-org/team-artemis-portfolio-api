import { object, string, ZodIssue, ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import { parseAsync, ErrorMessageOptions } from "zod-error";

export const CreateReferenceDetailSchema = object({
  name: string()
    .min(1, { message: "Name must not be an empty string" })
    .refine((name) => !!name, {
      message: "Name is required in the request body",
    }),

  company: string()
    .min(1, { message: "Company must not be an empty string" })
    .refine((company) => !!company, {
      message: "Company is required in the request body",
    }),

  position: string().optional(),

  emailAddress: string()
    .min(1, { message: "Email address must not be an empty string" })
    .refine((emailAddress) => !!emailAddress, {
      message: "Email address is required in the request body",
    }),

  phoneNumber: string().optional(),

  userId: string()
    .min(1, { message: "User ID must not be an empty string" })
    .optional()
    .nullish(),
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

    if (data.emailAddress && !validateEmail(data.emailAddress)) {
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
