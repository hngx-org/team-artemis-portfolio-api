import { z, AnyZodObject, ZodString } from "zod";
import { RequestHandler } from "express";

export const userIdSchema = z
  .string()
  .uuid({ message: "user_id must be a valid uuid" });

export const updateAboutMeSchema = z.object({
  bio: z.string({
    required_error: "About Me is required",
    invalid_type_error: "About Me must be a string",
  }),
});

export const createAboutMeSchema = z.object({
  bio: z.string({
    required_error: "About Me is required",
    invalid_type_error: "About Me must be a string",
  }),
  user_id: z.string().uuid({ message: "userId must be a valid uuid" }),
  section_id: z.number({
    required_error: "sectionId is required",
    invalid_type_error: "sectionId must be a number",
  }),
});

export const validateCreateAboutMeSchema =
  (schema: AnyZodObject): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: `Invalid request data`,
        data: {
          error: error.issues,
          statusCode: 400,
          timestamp: new Date().toISOString(),
        },
      });
    }
  };

export const validateUpdateAboutMe =
  (schema: AnyZodObject): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: `Invalid request data`,
        data: {
          error: error.issues,
          statusCode: 400,
          timestamp: new Date().toISOString(),
        },
      });
    }
  };

export const validateUser_id =
  (schema: ZodString): RequestHandler =>
  async (req, res, next) => {
    try {
      schema.parse(req.params.user_id);
      return next();
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: `Invalid request data`,
        data: {
          error: error.issues,
          statusCode: 400,
          timestamp: new Date().toISOString(),
        },
      });
    }
  };
