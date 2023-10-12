import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import { parseAsync, ErrorMessageOptions } from "zod-error";

export const CreateReferenceDetailSchema = z.object({
  name: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  emailAddress: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  userId: z.string().optional(), // You can customize the validation based on your entity
  sectionId: z.number().optional(),
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
    const userId = req.params.id;

    // Validate the rest of the data against the schema
    const result = await parseAsync(CreateReferenceDetailSchema, {
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

export { validateCreateReferenceData, validateEmail };
