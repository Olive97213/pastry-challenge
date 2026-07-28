import type { Recipe } from '@/db/schema';

type Props = {
  recipe: Recipe;
};

/**
 * Carte représentant une recette.
 */
export default function RecipeCard({ recipe }: Props) {
  return (
    <article>
      <h2>{recipe.title}</h2>

      <p>{recipe.description}</p>

      <p>{recipe.status}</p>

      <p>Créée le {recipe.createdAt.toLocaleDateString('fr-FR')}</p>

      <button>Modifier</button>

      <button>Supprimer</button>
    </article>
  );
}
