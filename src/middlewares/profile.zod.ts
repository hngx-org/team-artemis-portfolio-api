import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";
import { error } from "../utils";

export const createPorfolioDataSchema = z.object({
  body: z.object({
    name: z.optional(z.string({ invalid_type_error: "Name should be a string" }), {}),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({ required_error: "Country is Required" }),
    trackId: z.optional(z.number({ invalid_type_error: "TrackId must be a number" }), {}),
  }),
  params: z.object({
    userId: z
      .string({ required_error: "userId must be a uuid string" })
      .uuid({ message: "User id must be a uuid" }),
  }),
});

export const validateCreatePortfolioDetails =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      const messages = err.issues.map(issue => issue.message);

      return error(res, messages);
    }
  };