import { RecipesCard } from "@/components/recipes-card"

import { Recipe } from "@/lib/types"

export function RecipesCardList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-1 place-items-center justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe: Recipe) => (
        <RecipesCard
          key={recipe.id}
          name={recipe.name}
          description={recipe.description}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          prepTime={recipe.prepTime}
          servings={recipe.servings}
        />
      ))}
    </div>
  )
}
export type { Recipe }
