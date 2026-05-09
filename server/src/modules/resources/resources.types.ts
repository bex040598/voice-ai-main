import { z } from "zod";

export const createResourceSchema = z.object({
  title: z.string().min(2),
  type: z.string().min(2),
  fileUrl: z.string().url(),
  subjectId: z.string(),
  createdBy: z.string()
});
