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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
