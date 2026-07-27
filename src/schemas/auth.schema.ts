import { z } from 'zod';

/**
 * Schéma de validation des données d'inscription.
 *
 * Vérifie :
 * - le format du pseudo
 * - le format de l'email
 * - la longueur du mot de passe
 * - la confirmation du mot de passe
 */
export const registerSchema = z
  .object({
    /**
     * Nom d'utilisateur affiché publiquement.
     */
    username: z
      .string()
      .min(3, 'Le pseudo doit contenir au moins 3 caractères')
      .max(30, 'Le pseudo ne doit pas dépasser 30 caractères'),

    /**
     * Adresse email utilisée pour la connexion.
     */
    email: z.string().email('Email invalide'),

    /**
     * Mot de passe utilisateur.
     */
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),

    /**
     * Confirmation du mot de passe.
     */
    confirmPassword: z.string(),
  })

  /**
   * Vérifie que les deux mots de passe
   * correspondent.
   */
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',

    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
