import { ZodError, z } from "zod";
import { Request, Response } from "express";

const certificateDataSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).trim(),
  year: z
    .string()
    .min(4, { message: "Year should be a 4-digit number" })
    .refine((value) => /^\d{4}$/.test(value), {
      message: "Year should be a valid 4-digit number",
    })
    .optional(),
  organization: z
    .string({
      invalid_type_error: "Organization cannot be an empty string",
    })
    .min(1, { message: "Organization cannot be an empty string" })
    .optional(),
  url: z
    .string({
      invalid_type_error: "URL cannot be an empty string",
    })
    .url({ message: "Invalid URL format" })
    .trim()
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description cannot be an empty string",
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
  } catch (err) {
    const { message } = err as ZodError;

    const errorMessages = JSON.parse(message)?.map((error) => {
      if (error.code === "invalid_type") {
        return error.message;
      }
      return (error as z.ZodInvalidTypeIssue)?.message;
    });

    res.status(400).json({
      timestamp: new Date().toISOString(),
      error: "Bad Request Error",
      message: errorMessages,
      path: req.url,
      success: false,
    });

    isValidData = false;
  }

  return isValidData;
}

export { validateCertificateData, certificateDataSchema };
