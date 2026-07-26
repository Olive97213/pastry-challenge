import {
  pgTable,
  uuid,
  varchar,
  integer,
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
     * Identifiant unique.
     */
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),


    /**
     * Recette concernée.
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
     * Unité.
     *
     * Exemple :
     * g, ml, pièce
     */
    unit: varchar("unit", {
      length: 20,
    }),


    /**
     * Permet de conserver l'ordre
     * d'affichage des ingrédients.
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