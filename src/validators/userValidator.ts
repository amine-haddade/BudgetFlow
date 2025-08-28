import { z } from "zod";

//ajouter une règle personnalisée pour vérifier si la valeur est valide
const emailSchema = z.string().refine((val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(val);
}, {
  message: "Adresse email invalide"
});

export const registerSchema = z.object({
  name: z.string()
    .min(4, "Le nom doit contenir au moins 4 caractères")
    .max(15, "Le nom ne peut pas dépasser 15 caractères"),
  email: emailSchema,
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string()
    .min(8, "Mot de passe requis"),
});


