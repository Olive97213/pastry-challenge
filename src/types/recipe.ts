/**
 * Niveau de difficulté
 * d'une recette.
 */
export type RecipeDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

/**
 * Un ingrédient d'une préparation.
 */
export type RecipeIngredient = {
  /**
   * Identifiant temporaire
   * utilisé côté client.
   */
  id: string;

  /**
   * Nom de l'ingrédient.
   */
  name: string;

  /**
   * Quantité.
   */
  quantity?: number;

  /**
   * Unité.
   */
  unit?: string;

  /**
   * Information complémentaire.
   *
   * Exemple :
   * "Température ambiante"
   */
  note?: string;

  /**
   * Ordre d'affichage.
   */
  position: number;
};

/**
 * Une étape de réalisation.
 */
export type RecipeStep = {
  /**
   * Identifiant temporaire.
   */
  id: string;

  /**
   * Description de l'étape.
   */
  description: string;

  /**
   * Ordre d'affichage.
   */
  position: number;
};

/**
 * Une préparation.
 *
 * Exemple :
 *
 * - Pâte sucrée
 * - Crémeux citron
 * - Mousse vanille
 */
export type RecipePreparation = {
  /**
   * Identifiant temporaire.
   */
  id: string;

  /**
   * Nom de la préparation.
   */
  title: string;

  /**
   * Description.
   */
  description?: string;

  /**
   * Ordre d'affichage.
   */
  position: number;

  /**
   * Ingrédients.
   */
  ingredients: RecipeIngredient[];

  /**
   * Étapes.
   */
  steps: RecipeStep[];
};

/**
 * Toutes les données
 * de l'éditeur de recette.
 */
export type RecipeEditorData = {
  /**
   * Informations générales.
   */
  title: string;

  description?: string;

  image?: string;

  difficulty: RecipeDifficulty;

  prepTime?: number;

  cookTime?: number;

  restTime?: number;

  servings?: number;

  /**
   * Liste des préparations.
   */
  preparations: RecipePreparation[];
};
