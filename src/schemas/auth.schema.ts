import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Le pseudo doit contenir au moins 3 caractères")
    .max(30, "Le pseudo ne doit pas dépasser 30 caractères"),

  email: z
    .string()
    .email("Email invalide"),

  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});


export type RegisterInput = z.infer<typeof registerSchema>;