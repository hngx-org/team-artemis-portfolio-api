import { ZodError, ZodInvalidTypeIssue, z } from "zod";
import { Request, Response } from "express";

const certificateDataSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).trim(),
  year: z
    .string({ invalid_type_error: "Year must be a string" })
    .min(4, { message: "Year should be a 4-digit number" })
    .optional(),
  organization: z
    .string({
      invalid_type_error: "Organization must be a string",
    })
    .min(1, { message: "Organization cannot be an empty string" })
    .optional(),
  url: z.string().url({ message: "Invalid URL format" }).trim().optional(),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .min(1, { message: "Description cannot be an empty string" })
    .optional(),
  section_id: z
    .number()
    .int({ message: "Section ID should be an integer" })
    .optional(),
});

async function validateCertificateData(req: Request, res: Response) {
  let isValidData: boolean;
  try {
    await certificateDataSchema.parseAsync(req.body);
    isValidData = true;
    return isValidData;
  } catch (err) {
    const { errors, message } = err as ZodError;

    const errorMessages = errors.map((error) => error.message);
    res.status(400).json({
      success: false,
      error: errorMessages,
    });

    isValidData = false;
    return isValidData;
  }
}

export { validateCertificateData, certificateDataSchema };
