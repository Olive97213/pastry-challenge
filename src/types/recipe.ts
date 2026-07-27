/**
 * Réponse standard des actions recettes.
 */
export type RecipeActionResponse = {
  success: boolean;

  message: string;

  errors?: {
    field: string;
    message: string;
  }[];
};