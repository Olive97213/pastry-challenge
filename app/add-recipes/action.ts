"use server"

import { addRecipes as addRecipesDao } from "@/db/sgbd"
import { getRecipes as getRecipesDao } from "@/db/sgbd"
import { deleteRecipes as deleteRecipesDao } from "@/db/sgbd"
import { updateRecipes as updateRecipesDao } from "@/db/sgbd"
import { Recipe, ValidationError } from "@/lib/types"
import { revalidatePath } from "next/cache"
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
    revalidatePath("/add-recipes")
  }
}

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
  console.log("delete recipes action", id)
  try {
    await deleteRecipesDao(id)
  } catch (error) {
    console.error("Failed to delete recipe", error)
    throw error
  } finally {
    revalidatePath("/add-recipes")
  }
}
export const updateRecipesAction = async (
  id: string,
  recipe: Omit<Recipe, "id">
): Promise<FormState> => {
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
    revalidatePath("/add-recipes")
  }
}
