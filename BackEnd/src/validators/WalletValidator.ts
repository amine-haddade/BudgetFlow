import { z } from "zod";


export const createWalletSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(30),
  description:z.string().max(150).optional(),
  currency: z.enum(["MAD", "EUR", "USD"]),
  initialBudget: z.number().min(0, "Initial budget must be >= 0"),  
});


export const updateWalletSchema = z.object({
  name: z.string().min(3).max(30).optional(),
  description: z.string().max(150).optional(),
  currency: z.enum(["USD", "EUR", "MAD"]).optional(),
  initialBudget: z.number().min(0).optional(),
  balance: z.number().min(0, "Le solde doit être >= 0").optional(),
});

