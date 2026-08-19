'use server';

import { and, eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/db/client';
import { recipeIngredients, recipes } from '@/db/schema';

/**

* Récupère une recette appartenant
* à l'utilisateur actuellement connecté.
*
* Les ingrédients associés à la recette
* sont également récupérés.
  */
export async function getRecipe(recipeId: string) {
  /**

  * Vérification de la session utilisateur.
    */
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  /**

* Récupération de la recette.
*
* La condition sur userId garantit qu'un utilisateur
* ne peut récupérer que ses propres recettes.
  */
  const recipe = await db.query.recipes.findFirst({
    where: and(eq(recipes.id, recipeId), eq(recipes.userId, session.user.id)),
  });

  if (!recipe) {
    return null;
  }

  /**

* Récupération des ingrédients associés.
*
* Le tri par position permet de conserver
* l'ordre défini dans le wizard.
  */
  const ingredients = await db.query.recipeIngredients.findMany({
    where: eq(recipeIngredients.recipeId, recipeId),

    orderBy: (recipeIngredients, { asc }) => asc(recipeIngredients.position),
  });

  return {
    recipe,
    ingredients,
  };
}
