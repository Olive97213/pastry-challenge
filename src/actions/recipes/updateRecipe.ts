'use server';

import { and, eq, inArray } from 'drizzle-orm';

import { auth } from '@/auth';

import { db } from '@/db/client';

import {
  recipes,
  recipeIngredients,
  recipePreparations,
  recipeSteps,
} from '@/db/schema';

import type { RecipeActionResponse, UpdateRecipeInput } from '@/types/recipe';

/**
 * Met à jour une recette existante.
 *
 * Cette action :
 * - vérifie l'utilisateur connecté ;
 * - vérifie que la recette appartient à cet utilisateur ;
 * - met à jour les informations de la recette ;
 * - remplace les préparations existantes ;
 * - effectue toutes les opérations dans une transaction.
 */
export async function updateRecipe(
  data: UpdateRecipeInput,
): Promise<RecipeActionResponse> {
  /**
   * Vérification de la session utilisateur.
   */
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: 'Utilisateur non connecté',
    };
  }

  const userId = session.user.id;

  try {
    /**
     * Toutes les opérations sont regroupées
     * dans une transaction afin d'éviter
     * une mise à jour partielle.
     */
    await db.transaction(async (tx) => {
      /**
       * Mise à jour de la recette.
       *
       * La condition sur userId empêche un utilisateur
       * de modifier la recette d'un autre utilisateur.
       */
      const [recipe] = await tx
        .update(recipes)
        .set({
          ...(data.title !== undefined && { title: data.title }),
          ...(data.description !== undefined && {
            description: data.description,
          }),
          ...(data.image !== undefined && { image: data.image }),
          ...(data.prepTime !== undefined && { prepTime: data.prepTime }),
          ...(data.cookTime !== undefined && { cookTime: data.cookTime }),
          ...(data.restTime !== undefined && { restTime: data.restTime }),
          ...(data.servings !== undefined && { servings: data.servings }),
          ...(data.difficulty !== undefined && { difficulty: data.difficulty }),
          updatedAt: new Date(),
        })
        .where(and(eq(recipes.id, data.id), eq(recipes.userId, userId)))
        .returning({
          id: recipes.id,
        });

      /**
       * Si aucune recette n'est retournée,
       * la recette n'existe pas ou n'appartient
       * pas à l'utilisateur connecté.
       */
      if (!recipe) {
        throw new Error('RECIPE_NOT_FOUND');
      }

      /**
       * Suppression des anciennes préparations,
       * ingrédients et étapes.
       */
      const existingPreparations = await tx.query.recipePreparations.findMany({
        where: eq(recipePreparations.recipeId, data.id),
        columns: {
          id: true,
        },
      });

      const existingPreparationIds = existingPreparations.map(
        (preparation) => preparation.id,
      );

      if (existingPreparationIds.length > 0) {
        await tx
          .delete(recipeIngredients)
          .where(
            inArray(recipeIngredients.preparationId, existingPreparationIds),
          );

        await tx
          .delete(recipeSteps)
          .where(inArray(recipeSteps.preparationId, existingPreparationIds));

        await tx
          .delete(recipePreparations)
          .where(inArray(recipePreparations.id, existingPreparationIds));
      }

      /**
       * Recréation des préparations envoyées par le client.
       */
      if (data.preparations && data.preparations.length > 0) {
        for (const preparation of data.preparations) {
          const [createdPreparation] = await tx
            .insert(recipePreparations)
            .values({
              recipeId: data.id,
              title: preparation.title.trim(),
              description: preparation.description.trim() || null,
              position: preparation.position,
            })
            .returning({
              id: recipePreparations.id,
            });

          if (preparation.ingredients.length > 0) {
            await tx.insert(recipeIngredients).values(
              preparation.ingredients.map((ingredient) => ({
                preparationId: createdPreparation.id,
                name: ingredient.name.trim(),
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                note: ingredient.note?.trim() || null,
                position: ingredient.position,
              })),
            );
          }

          if (preparation.steps.length > 0) {
            await tx.insert(recipeSteps).values(
              preparation.steps.map((step) => ({
                preparationId: createdPreparation.id,
                description: step.description.trim(),
                position: step.position,
              })),
            );
          }
        }
      }
    });

    return {
      success: true,

      message: 'Recette mise à jour',

      recipeId: data.id,
    };
  } catch (error) {
    /**
     * Gestion spécifique du cas où
     * la recette n'existe pas ou n'appartient
     * pas à l'utilisateur.
     */
    if (error instanceof Error && error.message === 'RECIPE_NOT_FOUND') {
      return {
        success: false,
        message: 'Recette introuvable',
      };
    }

    /**
     * Gestion des autres erreurs inattendues.
     */
    console.error('Erreur mise à jour recette :', error);

    return {
      success: false,
      message: 'Impossible de mettre à jour la recette',
    };
  }
}
