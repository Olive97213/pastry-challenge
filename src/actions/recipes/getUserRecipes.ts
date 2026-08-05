'use server';

import { auth } from '@/auth';
import { db } from '@/db/client';
import { recipes } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

/**
 * Récupère toutes les recettes
 * de l'utilisateur connecté.
 *
 * Les recettes les plus récentes
 * sont affichées en premier.
 */
export async function getUserRecipes() {
  /**
   * Vérification de la session.
   */
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  /**
   * Récupération des recettes.
   */
  return await db.query.recipes.findMany({
    where: eq(recipes.userId, session.user.id),

    orderBy: desc(recipes.createdAt),
  });
}
