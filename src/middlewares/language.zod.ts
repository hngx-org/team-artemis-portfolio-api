import { NextFunction, Request, Response } from 'express';
import { validate as isValidUUID } from 'uuid';
import { AnyZodObject, z } from 'zod';
import { retrieveLanguages } from '../services/language.service';

// Define Zod schema
export const postLanguageSchema = z.object({
  userId: z.string().refine((value) => {
    return isValidUUID(value);
  }, 'id must be a valid UUID string'),
  language: z.string().refine(
    (value) => {
      const langArr = retrieveLanguages().map((v) => v.toLowerCase());
      return langArr.includes(value.toLowerCase());
    },
    { message: 'Not a given language' }
  ),
});

export const updatelanguageSchema = z.object({
  id: z.string().refine((value) => {
    return isValidUUID(value);
  }, 'id must be a valid UUID string'),
  userId: z.string().refine((value) => {
    return isValidUUID(value);
  }, 'id must be a valid UUID string'),
  preferred: z.boolean(),
  language: z.string().refine(
    (value) => {
      const langArr = retrieveLanguages().map((v) => v.toLowerCase());
      return langArr.includes(value.toLowerCase());
    },
    { message: 'Not a given language' }
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
        data: null,
      });
    }
  };
