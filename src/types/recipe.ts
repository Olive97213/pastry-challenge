/**
 * Niveau de difficulté
 * d'une recette.
 */
export type RecipeDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

/**
 * Unités disponibles pour les ingrédients.
 *
 * Les valeurs sont volontairement normalisées
 * afin de faciliter les recherches, les calculs
 * et les conversions futures.
 */
export type RecipeIngredientUnit =
  | 'g'
  | 'kg'
  | 'ml'
  | 'cl'
  | 'l'
  | 'piece'
  | 'feuille'
  | 'gousse'
  | 'pincee'
  | 'sachet'
  | 'cuillere-a-cafe'
  | 'cuillere-a-soupe';

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
  unit?: RecipeIngredientUnit;

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
   * Description de la préparation.
   */
  description: string;

  /**
   * Ordre d'affichage.
   */
  position: number;

  /**
   * Ingrédients utilisés
   * pour cette préparation.
   */
  ingredients: RecipeIngredient[];

  /**
   * Étapes de réalisation.
   */
  steps: RecipeStep[];
};

/**
 * Toutes les données
 * manipulées par l'éditeur.
 */
export type RecipeEditorData = {
  /**
   * Informations générales.
   */
  title: string;

  /**
   * Description générale
   * de la recette.
   */
  description: string;

  /**
   * Image principale.
   */
  image?: string;

  /**
   * Niveau de difficulté.
   */
  difficulty: RecipeDifficulty;

  /**
   * Temps de préparation
   * en minutes.
   */
  prepTime?: number;

  /**
   * Temps de cuisson
   * en minutes.
   */
  cookTime?: number;

  /**
   * Temps de repos
   * en minutes.
   */
  restTime?: number;

  /**
   * Nombre de portions.
   */
  servings?: number;

  /**
   * Liste des préparations
   * composant la recette.
   */
  preparations: RecipePreparation[];
};
/**
 * Données utilisées lors
 * de la création d'une recette.
 *
 * Pour le MVP, elles correspondent
 * exactement aux données de l'éditeur.
 */
export type CreateRecipeInput = RecipeEditorData;

/**
 * Données utilisées lors de la mise à jour
 * d'une recette existante.
 */
export type UpdateRecipeInput = {
  id: string;
} & Partial<CreateRecipeInput>;

/**
 * Réponse retournée par les actions
 * serveur liées aux recettes.
 */
export type RecipeActionResponse = {
  /**
   * Indique si l'opération
   * s'est correctement terminée.
   */
  success: boolean;

  /**
   * Message destiné à l'utilisateur.
   */
  message: string;

  /**
   * Identifiant de la recette créée.
   *
   * Présent uniquement lorsque
   * la création a réussi.
   */
  recipeId?: string;
};
