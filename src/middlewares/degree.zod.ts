import { z } from "zod";

export const DegreeDataSchema = z.object({
  type: z.string().trim().min(1, { message: "Type is required" }),
});
