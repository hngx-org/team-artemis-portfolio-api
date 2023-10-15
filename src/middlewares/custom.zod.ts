import { AnyZodObject, z } from "zod";
import { Request, Response, NextFunction } from "express";
export const validateSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
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
  
    export const validateQuery =
      (schema: AnyZodObject) =>
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          console.log(req.query);
          await schema.parseAsync(req.query);
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
const MAX_ID_LENGTH = 10;

const sectionIdSchema = z
  .number()
  .int()
  .positive()
  .refine((value) => {
    if (value <= 0) {
      throw new Error("Number must be greater than 0");
    }
    return true;
  });

export const validateSectionId = (sectionId: any, res: Response) => {
  try {
    const parsedSectionId = sectionIdSchema.parse(sectionId);

    if (!Number.isInteger(parsedSectionId)) {
      throw new Error("Section ID must be a whole number (integer)");
    }

    if (parsedSectionId.toString().length > MAX_ID_LENGTH) {
      throw new Error(`Section ID must have at most ${MAX_ID_LENGTH} digits`);
    }

    return true;
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
