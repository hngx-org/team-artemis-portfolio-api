import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";
import { error } from "../utils";
import { parseAsync } from "zod-error";

export const createPorfolioDataSchema = z.object({
  body: z.object({
    name: z.optional(z.string({ invalid_type_error: "Name should be a string" }).trim(), {}),
    city: z.optional(z.string({
      required_error: "City is required",
      invalid_type_error: "City should be type string"
    })
      .trim()),
    country: z.optional(z.string({
      required_error: "Country is Required",
      invalid_type_error: "Country must be type string"
    }).trim()),
    trackId: z.optional(z.number({ invalid_type_error: "TrackId must be a number" }), {}).nullable(),
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


export const updatePortfolioDataSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: "Name should be a string", required_error: "Name is required" }),
    trackId: z.number({ invalid_type_error: "TrackId must be a number", required_error: "TrackId is required" }),
    city: z.string({ invalid_type_error: "City should be a string" }).optional(),
    country: z.string({ invalid_type_error: "Country should be a string" }).optional(),
  }),
  params: z.object({
    userId: z
      .string({ required_error: "userId must be a uuid string" })
      .uuid({ message: "User id must be a uuid" }),
  }),
});


export const validateUpdatePortfolioDetails =
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
