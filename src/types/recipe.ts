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

/**
 * Données nécessaires pour créer
 * une recette en base.
 *
 * À ce stade du processus,
 * les champs obligatoires ont été validés.
 */
export type CreateRecipeInput = {
  /**
   * Nom obligatoire de la recette.
   */
  title: string;

  description?: string;

  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

  instructions?: string;

  prepTime?: number;

  cookTime?: number;

  restTime?: number;

  servings?: number;

  ingredients?: RecipeIngredientInput[];
};
