import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../middlewares";
import {
    parseAsync,
    ErrorMessageOptions,
    TransformErrorParams,
} from "zod-error";

const projectSchema = z.object({
    title: z.string().trim(),
    year: z.string().trim(),
    url: z.string().url({
        message: "Please provide a valid URL in this format: https://example.com",
    }).trim().optional(),
    tags: z.string().trim().optional(),
    description: z.string().trim().optional(),
    userId: z.string().uuid().trim(),
    sectionId: z.number().optional(),
});

const options: ErrorMessageOptions = {
    delimiter: {
        error: " 🔥 ",
    },
    transform: (error: TransformErrorParams) => `${error?.errorMessage}`,
};

async function validateUpdateData(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        await parseAsync(projectSchema, req.body, options);
        next();
    } catch (error) {
        const err = new BadRequestError(error.message);
        console.log(err.message);
        res.status(err.statusCode).json({ error: err.message });
    }
}

export { validateUpdateData, projectSchema };
