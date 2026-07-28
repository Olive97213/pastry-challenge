import { getUserRecipes } from '@/actions/recipes/getUserRecipes';

import EmptyState from './components/EmptyState';
import RecipeList from './components/RecipeList';

/**
 * Tableau de bord des recettes.
 *
 * Affiche toutes les recettes
 * appartenant à l'utilisateur connecté.
 */
export default async function DashboardRecipesPage() {
  const recipes = await getUserRecipes();

  if (recipes.length === 0) {
    return <EmptyState />;
  }

  return <RecipeList recipes={recipes} />;
}
