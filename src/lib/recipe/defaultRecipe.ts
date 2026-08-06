import type { RecipeEditorData } from '@/types/recipe';

export const defaultRecipe: RecipeEditorData = {
  title: '',
  description: '',
  image: undefined,

  difficulty: 'BEGINNER',

  prepTime: undefined,
  cookTime: undefined,
  restTime: undefined,

  servings: undefined,

  preparations: [],
};
