import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { recipes } from '@/db/schema';

/**
 * Récupère une recette complète
 * à partir de son identifiant.
 *
 * Les données récupérées comprennent :
 *
 * - les informations générales ;
 * - les préparations ;
 * - les ingrédients de chaque préparation ;
 * - les étapes de chaque préparation.
 */
export async function getRecipeById(recipeId: string) {
  return await db.query.recipes.findFirst({
    where: eq(recipes.id, recipeId),

    with: {
      preparations: {
        orderBy: (preparations, { asc }) => [asc(preparations.position)],

        with: {
          ingredients: {
            orderBy: (ingredients, { asc }) => [asc(ingredients.position)],
          },

          steps: {
            orderBy: (steps, { asc }) => [asc(steps.position)],
          },
        },
      },
    },
  });
}
