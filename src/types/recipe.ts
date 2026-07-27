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

  recipeId?: string;
};

/**
 * Un ingrédient d'une recette.
 */
export type RecipeIngredientInput = {
  /**
   * Nom de l'ingrédient.
   */
  name: string;

  /**
   * Quantité numérique.
   */
  quantity?: number;

  /**
   * Unité :
   * g, ml, cl, pièce...
   */
  unit?: string;
};

/**
 * Données temporaires conservées
 * pendant le wizard.
 */
export type RecipeWizardData = {
  title?: string;

  description?: string;

  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

  ingredients?: RecipeIngredientInput[];

  instructions?: string;

  prepTime?: number;

  cookTime?: number;

  restTime?: number;

  servings?: number;
};
