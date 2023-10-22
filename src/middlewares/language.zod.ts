import { NextFunction, Request, Response } from 'express';
import { validate as isValidUUID } from 'uuid';
import { AnyZodObject, z } from 'zod';

// Define Zod schema
export const postLanguageSchema = z.object({
  userId: z.string().refine((value) => {
    return isValidUUID(value);
  }, 'id must be a valid UUID string'),

  languages: z.array(z.string()).refine(
    (arr) => {
      return arr.every((str) => str.length >= 1);
    },
    {
      message: 'Each string in array must be at least 1 characters long',
    }
  ),
});

export const validateSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);

      return next();
    } catch (error: any) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request',
        message: JSON.parse(error.message)[0].message,
        data: JSON.parse(error.message)[0],
      });
    }
  };
