"use server"

// Fonctions d'accès aux données (DAO) vers la base de données locale
import { addRecipes as addRecipesDao } from "@/db/sgbd"
import { getRecipes as getRecipesDao } from "@/db/sgbd"
import { deleteRecipes as deleteRecipesDao } from "@/db/sgbd"
import { updateRecipes as updateRecipesDao } from "@/db/sgbd"
// Types de recette et format d'erreur pour la validation
import { Recipe, ValidationError } from "@/lib/types"
// Permet de revalider la page server-side après une modification de données
import { revalidatePath } from "next/cache"
// Schéma de validation zod partagé avec le formulaire client
import { formSchema, FormSchemaType } from "./schema"

export type FormState = {
  success: boolean
  errors?: ValidationError[]
  message?: string
}

export const addRecipesAction = async (
  recipe: Omit<Recipe, "id"> // on reçoit la recette sans id
): Promise<FormState> => {
  // on promet de retourner un FormState

  // 1. Validation Zod côté serveur
  // safeParse vérifie les données et retourne success/erreurs
  const parsed = formSchema.safeParse(recipe)

  if (!parsed.success) {
    // Zod a trouvé des erreurs — on les formate et on les retourne
    const validationErrors: ValidationError[] = parsed.error.errors.map(
      (err) => ({
        field: err.path[0] as keyof FormSchemaType,
        message: `zod server error ${err.message}`,
      })
    )
    return {
      success: false,
      errors: validationErrors,
      message: "Validation error",
    }
  }

  // 2. Si validation OK → on essaie d'ajouter en BDD
  try {
    await new Promise((resolve) => setTimeout(resolve, 6000))
    await addRecipesDao(recipe)
    return { success: true, message: "Recette ajoutée" } // succès
  } catch (error) {
    return { success: false, message: `Server Error ${error}` } // erreur BDD
  } finally {
    // Revalide la page d'ajout de recette pour rafraîchir le rendu côté serveur
    revalidatePath("/add-recipes")
  }
}

// Récupère toutes les recettes depuis la base de données
export const getRecipesAction = async () => {
  console.log("get recipes action")
  try {
    const recipes = await getRecipesDao()
    return recipes
  } catch (error) {
    console.error("Failed to get recipes", error)
    throw error
  }
}

export const deleteRecipesAction = async (id: string) => {
  // Supprime une recette à partir de son identifiant
  console.log("delete recipes action", id)
  try {
    await deleteRecipesDao(id)
  } catch (error) {
    console.error("Failed to delete recipe", error)
    throw error
  } finally {
    // Revalide la page pour mettre à jour la liste des recettes affichée
    revalidatePath("/add-recipes")
  }
}
export const updateRecipesAction = async (
  id: string,
  recipe: Omit<Recipe, "id">
): Promise<FormState> => {
  // Validation côté serveur avant de mettre à jour la recette
  const parsed = formSchema.safeParse(recipe)
  if (!parsed.success) {
    // Zod a trouvé des erreurs — on les formate et on les retourne
    const validationErrors: ValidationError[] = parsed.error.errors.map(
      (err) => ({
        field: err.path[0] as keyof FormSchemaType,
        message: `zod server error ${err.message}`,
      })
    )
    return {
      success: false,
      errors: validationErrors,
      message: "Validation error",
    }
  }
  console.log("update recipes action", id, recipe)
  try {
    await updateRecipesDao(id, recipe)
    return { success: true, message: "Recette mise à jour" }
  } catch (error) {
    console.error("Failed to update recipe", error)
    return { success: false, message: `Server Error ${error}` }
  } finally {
    // Revalide la page pour rafraîchir les données après la mise à jour
    revalidatePath("/add-recipes")
  }
}
