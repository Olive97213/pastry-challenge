'use server';

import { eq, and } from 'drizzle-orm';

import { auth } from '@/auth';

import { db } from '@/db/client';

import { recipes, recipeIngredients } from '@/db/schema';

import type { RecipeActionResponse, UpdateRecipeInput } from '@/types/recipe';

/**
 * Met à jour une recette existante.
 *
 * Cette action :
 * - vérifie l'utilisateur connecté ;
 * - vérifie que la recette appartient à cet utilisateur ;
 * - met à jour les informations de la recette ;
 * - remplace les ingrédients existants ;
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
          title: data.title,

          description: data.description,

          instructions: data.instructions,

          prepTime: data.prepTime,

          cookTime: data.cookTime,

          restTime: data.restTime,

          servings: data.servings,

          difficulty: data.difficulty ?? 'BEGINNER',

          updatedAt: new Date(),
        })
        .where(
          and(eq(recipes.id, data.id), eq(recipes.userId, session.user.id)),
        )
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
       * Suppression des anciens ingrédients.
       *
       * Ils seront recréés avec les données
       * actuellement présentes dans le wizard.
       */
      await tx
        .delete(recipeIngredients)
        .where(eq(recipeIngredients.recipeId, data.id));

      /**
       * Création des nouveaux ingrédients.
       */
      if (data.ingredients && data.ingredients.length > 0) {
        await tx.insert(recipeIngredients).values(
          data.ingredients.map((ingredient, index) => ({
            recipeId: data.id,

            name: ingredient.name,

            quantity: ingredient.quantity,

            unit: ingredient.unit,

            position: index,
          })),
        );
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
