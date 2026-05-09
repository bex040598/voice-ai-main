import { z } from "zod";

export const telegramLinkSchema = z.object({
  userId: z.string(),
  telegramId: z.string()
});

export const telegramRouteSchema = z.object({
  telegramId: z.string(),
  route: z.object({
    distance: z.number(),
    estimatedTime: z.string(),
    steps: z.array(z.string()),
    path: z.array(z.string())
  })
});
