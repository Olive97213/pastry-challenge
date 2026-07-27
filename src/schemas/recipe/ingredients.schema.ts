import { z } from "zod";


/**
 * Validation d'un ingrédient.
 */
export const ingredientSchema =
  z.object({

    name: z
      .string()
      .min(
        1,
        "Le nom est obligatoire"
      ),


    quantity: z
      .number()
      .positive()
      .optional(),


    unit: z
      .string()
      .optional(),

  });



/**
 * Validation de la liste complète.
 */
export const ingredientsSchema =
  z.object({

    ingredients:
      z.array(
        ingredientSchema
      )
      .min(
        1,
        "Ajoutez au moins un ingrédient"
      ),

  });