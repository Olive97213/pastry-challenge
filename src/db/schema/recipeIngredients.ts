import {
  pgTable,
  uuid,
  varchar,
  integer,
  text,
} from "drizzle-orm/pg-core";

import { recipes } from "./recipes";
import { timestamps } from "./common";


/**
 * Ingrédients associés aux recettes.
 *
 * Une recette possède plusieurs ingrédients.
 */
export const recipeIngredients = pgTable(
  "recipe_ingredients",
  {

    /**
     * Identifiant unique de l'ingrédient.
     */
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),


    /**
     * Recette à laquelle appartient l'ingrédient.
     */
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id, {
        onDelete: "cascade",
      }),


    /**
     * Nom de l'ingrédient.
     *
     * Exemple :
     * "Farine T55"
     */
    name: varchar("name", {
      length: 100,
    })
      .notNull(),


    /**
     * Quantité numérique.
     *
     * Exemple :
     * 250
     */
    quantity: integer("quantity"),


    /**
     * Unité de mesure.
     *
     * Exemple :
     * g, ml, pièce
     */
    unit: varchar("unit", {
      length: 20,
    }),


    /**
     * Informations complémentaires.
     *
     * Exemple :
     * "à température ambiante"
     * "haché grossièrement"
     */
    note: text("note"),


    /**
     * Ordre d'affichage des ingrédients.
     */
    position: integer("position")
      .notNull()
      .default(0),


    ...timestamps,

  }
);


export type RecipeIngredient =
  typeof recipeIngredients.$inferSelect;


export type InsertRecipeIngredient =
  typeof recipeIngredients.$inferInsert;