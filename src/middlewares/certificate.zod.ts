import { z, ZodAny } from "zod";
import { Request, Response, NextFunction } from "express";

export const CertificateSchema = z.object({
  title: z.string().min(1).max(255),
  year: z.string().min(4).max(4),
  organization: z.string().min(1).max(255),
  url: z.string().url().optional(),
  description: z.string().min(1),
  userId: z.string(),
  sectionId: z.number(),
});

export const validateCertificate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const certificatePayload = CertificateSchema.parse(req.body);
    req.body = certificatePayload; // Replace the request body with the validated payload
    next();
  } catch (error) {
    res.status(400).json({ success: false, error: error.errors });
  }
};
