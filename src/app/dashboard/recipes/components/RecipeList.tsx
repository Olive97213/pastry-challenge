import type { Recipe } from '@/db/schema';

import RecipeCard from './RecipeCard';

type Props = {
  recipes: Recipe[];
};

/**
 * Liste des recettes.
 */
export default function RecipeList({ recipes }: Props) {
  return (
    <section>
      <h1>Mes recettes</h1>

      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </section>
  );
}
