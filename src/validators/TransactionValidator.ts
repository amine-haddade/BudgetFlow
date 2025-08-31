// validators/transactionValidator.ts
import { z } from "zod";

export const createTransactionSchema = z.object({
  wallet: z.string().min(1, "Wallet ID is required"),
  category: z.string().min(1, "Category ID is required"),
  type: z.enum(["income", "expense"]),
  amount: z.number().min(0, "Amount must be >= 0"),
  date: z.coerce.date().optional(),
  note: z.string().max(200).optional(),
});

export const updateTransactionSchema = z.object({
  wallet: z.string().optional(),
  category: z.string().optional(),
  type: z.enum(["income", "expense"]).optional(),
  amount: z.number().min(0).optional(),
  date: z.coerce.date().optional(),
  note: z.string().max(200).optional(),
});
