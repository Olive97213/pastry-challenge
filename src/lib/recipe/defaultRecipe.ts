import type { RecipeEditorData } from '@/types/recipe';

/**
 * Données initiales utilisées
 * lors de la création d'une nouvelle recette.
 *
 * Elles constituent l'état de départ
 * de l'éditeur.
 */
export const defaultRecipe: RecipeEditorData = {
  /**
   * Informations générales.
   */
  title: '',
  description: '',
  image: undefined,

  /**
   * Difficulté par défaut.
   */
  difficulty: 'BEGINNER',

  /**
   * Temps de préparation,
   * cuisson et repos.
   */
  prepTime: undefined,
  cookTime: undefined,
  restTime: undefined,

  /**
   * Nombre de portions.
   */
  servings: undefined,

  /**
   * Une nouvelle recette
   * ne contient aucune préparation
   * au départ.
   */
  preparations: [],
};
