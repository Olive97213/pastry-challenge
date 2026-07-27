import { z } from 'zod';

/**
 * Validation de l'étape préparation.
 *
 * Les champs peuvent rester incomplets
 * tant que la recette est un brouillon.
 */
export const preparationSchema = z.object({
  /**
   * Étapes détaillées de réalisation.
   */
  instructions: z
    .string()
    .min(10, 'Les instructions doivent contenir au moins 10 caractères')
    .optional(),

  /**
   * Temps de préparation en minutes.
   */
  prepTime: z.number().nonnegative('Le temps doit être positif').optional(),

  /**
   * Temps de cuisson en minutes.
   */
  cookTime: z.number().nonnegative('Le temps doit être positif').optional(),

  /**
   * Temps de repos en minutes.
   */
  restTime: z.number().nonnegative('Le temps doit être positif').optional(),

  /**
   * Nombre de portions.
   */
  servings: z
    .number()
    .positive('Le nombre de portions doit être supérieur à 0')
    .optional(),
});

export type PreparationInput = z.infer<typeof preparationSchema>;
