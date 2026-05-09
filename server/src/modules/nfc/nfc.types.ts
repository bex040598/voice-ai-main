import { z } from "zod";

export const nfcResolveSchema = z.object({
  code: z.string().min(3)
});
