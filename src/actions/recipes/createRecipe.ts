'use server';

import { auth } from '@/auth';

import { db } from '@/db/client';

import {
  recipes,
  recipePreparations,
  recipeIngredients,
  recipeSteps,
} from '@/db/schema';

import { generateSlug } from '@/lib/slug';

import type { CreateRecipeInput, RecipeActionResponse } from '@/types/recipe';

/**
 * Création d'une recette brouillon.
 *
 * Cette action :
 *
 * - vérifie que l'utilisateur est connecté ;
 * - crée la recette ;
 * - crée les préparations ;
 * - crée les ingrédients de chaque préparation ;
 * - crée les étapes de chaque préparation ;
 * - effectue toutes les opérations dans
 *   une seule transaction PostgreSQL.
 */
export async function createRecipe(
  data: CreateRecipeInput,
): Promise<RecipeActionResponse> {
  /**
   * Vérification de la session.
   */
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: 'Utilisateur non connecté',
    };
  }

  /**
   * Vérification minimale du titre.
   */
  if (!data.title.trim()) {
    return {
      success: false,
      message: 'Le titre de la recette est obligatoire',
    };
  }

  try {
    /**
     * Génération du slug.
     */
    const slug = generateSlug(data.title);

    /**
     * Transaction PostgreSQL.
     *
     * Toutes les opérations seront annulées
     * si une seule d'entre elles échoue.
     */
    const recipeId = await db.transaction(async (tx) => {
      /**
       * Création de la recette principale.
       */
      const [recipe] = await tx
        .insert(recipes)
        .values({
          userId: session.user.id,

          title: data.title.trim(),

          slug,

          image: data.image,

          description: data.description,

          prepTime: data.prepTime,

          cookTime: data.cookTime,

          restTime: data.restTime,

          servings: data.servings,

          difficulty: data.difficulty,

          /**
           * Toute nouvelle recette
           * commence en brouillon.
           */
          status: 'DRAFT',
        })
        .returning({
          id: recipes.id,
        });

      /**
       * Création de chaque préparation.
       */
      for (const preparation of data.preparations) {
        /**
         * Création de la préparation.
         */
        const [createdPreparation] = await tx
          .insert(recipePreparations)
          .values({
            recipeId: recipe.id,

            title: preparation.title.trim(),

            description: preparation.description.trim() || null,

            position: preparation.position,
          })
          .returning({
            id: recipePreparations.id,
          });

        /**
         * Création des ingrédients
         * de la préparation.
         */
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

        /**
         * Création des étapes
         * de la préparation.
         */
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

      /**
       * Retourne l'identifiant de la recette.
       */
      return recipe.id;
    });

    /**
     * La transaction s'est terminée
     * correctement.
     */
    return {
      success: true,

      message: 'Recette enregistrée',

      recipeId,
    };
  } catch (error) {
    /**
     * Gestion des erreurs inattendues.
     */
    console.error('Erreur création recette :', error);

    return {
      success: false,

      message:
        "Une erreur est survenue lors de l'enregistrement de la recette.",
    };
  }
}
