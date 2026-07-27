// Composant qui affiche une card de recette individuelle
import { RecipesCard } from '@/components/recipes-card';

// Type de donnée Recipe importé depuis le dossier de types partagé
import { Recipe } from '@/lib/types';

// Composant de liste qui transforme un tableau de recettes en cards
export function RecipesCardList({ recipes }: { recipes: Recipe[] }) {
  return (
    // Grille responsive qui centre les cards en mobile et affiche plusieurs colonnes sur desktop
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
  );
}
// Réexporter le type Recipe pour le rendre disponible ailleurs si besoin
export type { Recipe };
