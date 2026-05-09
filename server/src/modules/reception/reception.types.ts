import { z } from "zod";

export const createReceptionSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(7),
  type: z.enum(["application", "suggestion", "complaint", "appointment"]),
  message: z.string().min(5)
});

export const receptionStatusSchema = z.object({
  status: z.enum(["new", "in_review", "accepted", "rejected", "completed"])
});
