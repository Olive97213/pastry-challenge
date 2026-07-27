"use server";

import { auth } from "@/auth";

import { db } from "@/db/client";
import { recipes } from "@/db/schema";

import {
  generateSlug,
} from "@/lib/slug";


import type {
  RecipeActionResponse,
} from "@/types/recipe";



/**
 * Création d'une recette brouillon.
 *
 * Une recette appartient obligatoirement
 * à l'utilisateur connecté.
 */
export async function createRecipe(
  data: {
    title: string;
  }
): Promise<RecipeActionResponse> {


  /**
   * Vérification de la session.
   */
  const session =
    await auth();



  if (!session?.user?.id) {

    return {
      success: false,
      message:
        "Vous devez être connecté",
    };
  }



  /**
   * Génération du slug.
   */
  const slug =
    generateSlug(
      data.title
    );



  /**
   * Création de la recette.
   *
   * Le statut DRAFT est appliqué
   * automatiquement par PostgreSQL.
   */
  await db.insert(recipes)
    .values({

      userId:
        session.user.id,


      title:
        data.title,


      slug,

    });



  return {

    success: true,

    message:
      "Brouillon créé",

  };
}