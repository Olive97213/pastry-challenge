import { notFound } from 'next/navigation';

import { getRecipe } from '@/actions/recipes/getRecipe';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/**

* Page d'édition d'une recette.
*
* Récupère la recette correspondant à l'identifiant
* présent dans l'URL.
  */
export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;

  const result = await getRecipe(id);

  /**

* La recette n'existe pas ou n'appartient
* pas à l'utilisateur connecté.
  */
  if (!result) {
    notFound();
  }

  const { recipe, ingredients } = result;

  return (
    <main>
      <h1>Modifier la recette</h1>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <p>Ingrédients : {ingredients.length}</p>
    </main>
  );
}
