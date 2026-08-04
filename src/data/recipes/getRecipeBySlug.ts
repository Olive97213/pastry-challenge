import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { recipes } from '@/db/schema';

/**
 * Récupère une recette
 * à partir de son slug.
 */
export async function getRecipeBySlug(slug: string) {
  return await db.query.recipes.findFirst({
    where: eq(recipes.slug, slug),

    with: {
      ingredients: {
        orderBy: (ingredients, { asc }) => [asc(ingredients.position)],
      },

      author: {
        columns: {
          id: true,

          name: true,

          image: true,
        },
      },
    },
  });
}
