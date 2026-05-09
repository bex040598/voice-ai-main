import { z } from "zod";

export const updateUserSchema = z.object({
  fullName: z.string().min(3).optional(),
  role: z.enum(["guest", "student", "teacher", "admin", "super_admin"]).optional(),
  telegramId: z.string().nullable().optional()
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
