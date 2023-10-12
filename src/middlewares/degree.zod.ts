import { z } from "zod";

export const DegreeDataSchema = z.object({
  type: z.string().min(1, { message: "Type is required" }),
});
