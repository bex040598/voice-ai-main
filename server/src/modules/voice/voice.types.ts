import { z } from "zod";

export const transcriptSchema = z.object({
  transcript: z.string().min(1)
});
