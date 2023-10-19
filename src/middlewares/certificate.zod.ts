import { ZodError, z } from "zod";
import { Request, Response } from "express";

// Create Certificate Schema
const CreatecertificateDataSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title cannot be an empty string",
    })
    .trim(),
  year: z
    .string({
      required_error: "Year is required",
      invalid_type_error: "Year cannot be an empty string",
    })
    .refine((value) => /^\d{4}$/.test(value), {
      message: "Year should be a valid 4-digit number",
    })
    .optional(),
  organization: z.string({
    required_error: "Organization is required",
    invalid_type_error: "Organization cannot be an empty string",
  }),
  url: z
    .string({
      required_error: "URL is required",
      invalid_type_error: "URL cannot be an empty string",
    })
    .url({ message: "Invalid URL format" })
    .trim(),
  description: z.string({
    invalid_type_error: "Description cannot be an empty string",
  }),
  sectionId: z.number({
    required_error: "Section ID is required",
    invalid_type_error: "Section ID must be an integer",
  }).int({ message: "Section ID should be an integer" }),
});

// Update certificate data schema
const certificateDataUpdateSchema = z.object({
  title: z.string().trim().optional(),
  year: z
    .string()
    .refine((value) => /^\d{4}$/.test(value), {
      message: "Year should be a valid 4-digit number",
    })
    .optional(),
  organization: z.string().optional(),
  url: z.string().url({ message: "Invalid URL format" }).trim().optional(),
  description: z.string().optional(),
  sectionId: z
    .number()
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
      await certificateDataUpdateSchema.parseAsync(req.body);
    } else {
      await CreatecertificateDataSchema.parseAsync(req.body);
    }
    isValidData = true;
  } catch (err) {
    const { errors } = err as ZodError;

    const errorMessages = errors.map((error) => {
      if (error.code === "invalid_type") {
        return error.message;
      }
      return error?.message;
    });

    res.status(400).json({
      success: false,
      message: errorMessages,
      data: null,
    });

    isValidData = false;
  }

  return isValidData;
}

export { validateCertificateData, CreatecertificateDataSchema };
