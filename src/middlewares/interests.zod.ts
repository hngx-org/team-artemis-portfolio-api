import { z, AnyZodObject, ZodString } from "zod";
import { RequestHandler } from "express";

export const userIdSchema = z
  .string()
  .uuid({ message: "userId must be a valid uuid" });

export const updateInterestsSchema = z.object({
  interests: z.array(
    z.string({
      required_error: "Interests are required",
      invalid_type_error: "Interests must be a string",
    })
  ),
});

export const validateUpdateInterest =
  (schema: AnyZodObject): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: `invalid request data`,
        data: {
          error: error.issues,
          statusCode: 400,
          timestamp: new Date().toISOString(),
        },
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
        status: "error",
        message: `invalid request data`,
        data: {
          error: error.issues,
          statusCode: 400,
          timestamp: new Date().toISOString(),
        },
      });
    }
  };
