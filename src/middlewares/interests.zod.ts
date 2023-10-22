import { z, AnyZodObject, ZodString } from "zod";
import { RequestHandler } from "express";
import { BadRequestError } from ".";

const interestsPattern = /^[a-zA-Z]+$/;

export const userIdSchema = z
  .string({ required_error: "userId is required." })
  .trim()
  .uuid({ message: "userId must be a valid uuid." });

export const updateInterestsSchema = z.object({
  interests: z
    .array(
      z
        .string({
          invalid_type_error: "Every interest must be a string",
        })
        .trim()
        .regex(interestsPattern, {
          message: "Every interest must contain only letters.",
        })
        .min(3, {
          message: "Every interest must be at least 3 characters long.",
        }),
      {
        required_error: "You must provide interests",
        invalid_type_error: "Interests must be an array of strings",
      }
    )
    .nonempty({ message: "You must provide at least one interest." }),
});

export const createInterestSchema = z.object({
  interests: z
    .array(
      z
        .string({
          invalid_type_error: "Every interest must be a string",
        })
        .trim()
        .regex(interestsPattern, {
          message: "Every interest must contain only letters.",
        })
        .min(3, {
          message: "Every interest must be at least 3 characters long.",
        }),
      {
        required_error: "You must provide interests",
        invalid_type_error: "Interests must be an array of strings",
      }
    )
    .nonempty({ message: "You must provide at least one interest." }),
  userId: z
    .string({ required_error: "userId is required." })
    .trim()
    .uuid({ message: "userId must be a valid uuid." }),
  sectionId: z
    .number({
      required_error: "sectionId is required.",
      invalid_type_error: "sectionId must be a number.",
    })
    .gt(0, { message: "sectionId cannot be 0." }),
});

export const validateCreateSchema =
  (schema: AnyZodObject): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      return res.status(400).json({
        timestamp: new Date().toISOString(),
        success: false,
        statusCode: 400,
        message: "Invalid request data",
        error: error.flatten().fieldErrors,
      });
    }
  };

export const validateUpdateInterest =
  (schema: AnyZodObject): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      return res.status(400).json({
        timestamp: new Date().toISOString(),
        success: false,
        statusCode: 400,
        message: "Invalid request data",
        error: error.flatten().fieldErrors,
      });
    }
  };

export const validateUserId =
  (schema: ZodString): RequestHandler =>
  async (req, res, next) => {
    try {
      schema.parse(req.params.userId);
      return next();
    } catch (error: any) {
      return res.status(400).json({
        timestamp: new Date().toISOString(),
        success: false,
        statusCode: 400,
        message: "Invalid request data",
        error: error.flatten().formErrors,
      });
    }
  };
