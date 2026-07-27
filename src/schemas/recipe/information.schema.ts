import { z } from 'zod';

/**
 * Validation de l'étape 1 :
 * informations générales d'une recette.
 *
 * Cette étape concerne uniquement
 * les données nécessaires à l'identification
 * de la recette.
 */
export const recipeInformationSchema = z.object({
  /**
   * Nom public de la recette.
   */
  title: z
    .string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(150, 'Le titre est trop long'),

  /**
   * Description courte affichée
   * sur la fiche recette.
   */
  description: z.string().max(500, 'La description est trop longue').optional(),

  /**
   * Niveau de difficulté.
   */
  difficulty: z
    .enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
    .default('BEGINNER'),
});

/**
 * Type utilisé par React Hook Form.
 *
 * On utilise input car il correspond
 * aux données avant validation.
 */
export type RecipeInformationInput = z.input<typeof recipeInformationSchema>;
