import { ZodError, z } from "zod";
import { Request, Response } from "express";

// Create Certificate Schema
const createCertificateDataSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title cannot be an empty string",
    })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: "Title can only contain alphabets",
    }),
  year: z
    .string({
      required_error: "Year is required",
      invalid_type_error: "Year can only be passed as string",
    })
    .refine((value) => /^\d{4}$/.test(value), {
      message: "Year should be a valid 4-digit number",
    })
    .optional(),
  organization: z
    .string({
      required_error: "Organization is required",
      invalid_type_error: "Organization cannot be an empty string",
    })
    .refine((value) => /^[A-Za-z]*$/.test(value), {
      message: "Organization can only contain alphabets and spaces",
    }),
  url: z
    .string({
      required_error: "URL is required",
      invalid_type_error: "URL cannot be an empty string",
    })
    .url({ message: "Invalid URL format" })
    .trim(),
  description: z
    .string({
      invalid_type_error: "Description cannot be an empty string",
    })
    .min(30, {
      message: "Description must be at least 30 characters long",
    }),
  sectionId: z
    .number({
      required_error: "Section ID is required",
      invalid_type_error: "Section ID must be an integer",
    })
    .int({ message: "Section ID should be an integer" }),
});

// Update certificate data schema
const updateCertificateDataSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .trim()
    .refine((value) => /^[a-zA-Z ]+$/.test(value), {
      message: "Title can only contain alphabets",
    })
    .optional(),
  year: z
    .string({
      required_error: "Year is required",
      invalid_type_error: "Year can only be passed as a string",
    })
    .refine((value) => /^\d{4}$/.test(value), {
      message: "Year should be a valid 4-digit number",
    })
    .optional(),
  organization: z
    .string({
      required_error: "Organization is required",
      invalid_type_error: "Organization must be a string",
    })
    .refine((value) => /^[A-Za-z]*$/.test(value), {
      message: "Organization can only contain alphabets",
    })
    .optional(),
  url: z
    .string({
      required_error: "URL is required",
      invalid_type_error: "URL must be a string",
    })
    .url({ message: "Invalid URL format" })
    .trim()
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .min(30, {
      message: "Description must be at least 30 characters long",
    })
    .optional(),
  sectionId: z
    .number({
      required_error: "Section ID is required",
      invalid_type_error: "Section ID must be an integer",
    })
    .int({ message: "Section ID should be an integer" })
    .optional(),
});

async function validateCertificateData(
  req: Request,
  res: Response,
  isUpdate: boolean = false
) {
  let isValidData: boolean;

  try {
    if (isUpdate) {
      await updateCertificateDataSchema.parseAsync(req.body);
    } else {
      await createCertificateDataSchema.parseAsync(req.body);
    }
    isValidData = true;
  } catch (err) {
    const { errors } = err as ZodError;

    const errorMessages = errors.map((error) => {
      return {
        field: error.path.join("."),
        message: error.message,
      };
    });

    errorResponse(req, res, errorMessages);
    isValidData = false;
  }

  return isValidData;
}

const errorResponse = (
  req: Request,
  res: Response,
  message: any,
  statusCode?: number
) => {
  res.status(400).json({
    timestamp: new Date().toISOString(),
    status: 400,
    error: "BadRequest Error",
    message: message,
    path: req.path,
    success: false,
  });
};

export { validateCertificateData, errorResponse };
