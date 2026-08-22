'use server';

import { and, eq, inArray } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/db/client';
import { recipeIngredients, recipePreparations, recipes } from '@/db/schema';

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
   * Récupération des identifiants des préparations
   * de cette recette pour ensuite filtrer les ingrédients.
   */
  const preparations = await db.query.recipePreparations.findMany({
    where: eq(recipePreparations.recipeId, recipeId),
    columns: {
      id: true,
    },
  });

  const preparationIds = preparations.map((preparation) => preparation.id);

  /**
   * Récupération des ingrédients associés.
   *
   * Le tri par position permet de conserver
   * l'ordre défini dans le wizard.
   */
  const ingredients =
    preparationIds.length > 0
      ? await db.query.recipeIngredients.findMany({
          where: inArray(recipeIngredients.preparationId, preparationIds),
          orderBy: (recipeIngredients, { asc }) =>
            asc(recipeIngredients.position),
        })
      : [];

  return {
    recipe,
    ingredients,
  };
}
