'use server';

import { and, eq } from 'drizzle-orm';

import { auth } from '@/auth';

import { db } from '@/db/client';

import { recipes } from '@/db/schema';

import type { RecipeActionResponse } from '@/types/recipe';

/**
 * Supprime une recette.
 *
 * Vérifie que la recette
 * appartient bien à l'utilisateur connecté.
 */
export async function deleteRecipe(
  recipeId: string,
): Promise<RecipeActionResponse> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: 'Utilisateur non connecté',
    };
  }

  const userId = session.user.id;

  const deleted = await db
    .delete(recipes)
    .where(and(eq(recipes.id, recipeId), eq(recipes.userId, userId)))
    .returning({
      id: recipes.id,
    });

  if (deleted.length === 0) {
    return {
      success: false,
      message: 'Recette introuvable',
    };
  }

  return {
    success: true,
    message: 'Recette supprimée',
  };
}
