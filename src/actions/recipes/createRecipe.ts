'use server';

import { auth } from '@/auth';

import { db } from '@/db/client';

import { recipes, recipeIngredients } from '@/db/schema';

import { generateSlug } from '@/lib/slug';

import type { CreateRecipeInput, RecipeActionResponse } from '@/types/recipe';

/**
 * Création d'une recette brouillon.
 *
 * Cette action :
 * - vérifie l'utilisateur connecté
 * - crée la recette
 * - ajoute les ingrédients associés
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
   * Génération du slug.
   */
  const slug = generateSlug(data.title);

  /**
   * Insertion de la recette.
   */
  const [recipe] = await db
    .insert(recipes)
    .values({
      userId: session.user.id,

      title: data.title,

      slug,

      description: data.description,

      instructions: data.instructions,

      prepTime: data.prepTime,

      cookTime: data.cookTime,

      restTime: data.restTime,

      servings: data.servings,

      difficulty: data.difficulty,
    })
    .returning({
      id: recipes.id,
    });

  /**
   * Ajout des ingrédients liés
   * à la recette.
   */
  if (data.ingredients && data.ingredients.length > 0) {
    await db.insert(recipeIngredients).values(
      data.ingredients.map((ingredient, index) => ({
        recipeId: recipe.id,

        name: ingredient.name,

        quantity: ingredient.quantity,

        unit: ingredient.unit,

        position: index,
      })),
    );
  }

  return {
    success: true,

    message: 'Recette enregistrée',

    recipeId: recipe.id,
  };
}
