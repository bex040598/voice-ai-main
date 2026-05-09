import { z } from "zod";

export const createTestSchema = z.object({
  title: z.string().min(2),
  subjectId: z.string(),
  createdBy: z.string()
});

export const submitTestSchema = z.object({
  testId: z.string(),
  studentId: z.string(),
  answers: z.record(z.string())
});
