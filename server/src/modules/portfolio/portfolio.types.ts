import { z } from "zod";

export const createPortfolioItemSchema = z.object({
  portfolioId: z.string(),
  fileUrl: z.string().url(),
  type: z.string().min(2),
  description: z.string().min(3)
});
