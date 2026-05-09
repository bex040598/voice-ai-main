import { z } from "zod";

export const createBuildingSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(3)
});

export type CreateBuildingInput = z.infer<typeof createBuildingSchema>;
