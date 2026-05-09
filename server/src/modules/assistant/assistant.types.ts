import { z } from "zod";

export const assistantQuerySchema = z.object({
  prompt: z.string().min(2)
});

export const assistantVoiceSchema = z.object({
  transcript: z.string().min(1)
});
