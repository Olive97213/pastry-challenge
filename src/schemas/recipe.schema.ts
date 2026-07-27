import { z } from 'zod';

/**
 * Validation d'une recette.
 */
export const recipeSchema = z.object({
  title: z
    .string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(150, 'Le titre est trop long'),

  description: z
    .string()
    .min(20, 'La description doit contenir au moins 20 caractères')
    .optional(),

  instructions: z
    .string()
    .min(20, 'Les instructions doivent contenir au moins 20 caractères'),

  prepTime: z.number().min(1, 'Le temps de préparation est obligatoire'),

  cookTime: z.number().optional(),

  restTime: z.number().optional(),

  servings: z.number().min(1, 'Le nombre de portions est obligatoire'),
});

export type RecipeInput = z.infer<typeof recipeSchema>;
