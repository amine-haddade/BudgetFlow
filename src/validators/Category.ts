// validators/categoryValidator.ts
import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2).max(30),
  color: z.string().max(20).optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).max(30).optional(),
  color: z.string().max(20).optional(),
});
