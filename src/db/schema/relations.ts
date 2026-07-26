import { relations } from "drizzle-orm";

import { users } from "./users";
import { accounts } from "./accounts";
import { sessions } from "./sessions";
import { recipes } from "./recipes";
import { recipeIngredients } from "./recipeIngredients";


/**
 * Relations utilisateur.
 *
 * Un utilisateur peut avoir :
 * - plusieurs comptes OAuth
 * - plusieurs sessions
 * - plusieurs recettes
 */
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  recipes: many(recipes),
}));


/**
 * Relation compte OAuth.
 *
 * Un compte externe appartient à un utilisateur.
 */
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));


/**
 * Relation session.
 *
 * Une session appartient à un utilisateur.
 */
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));


/**
 * Relation recette.
 *
 * Une recette :
 * - appartient à un utilisateur
 * - possède plusieurs ingrédients
 */
export const recipesRelations = relations(recipes, ({ one, many }) => ({
  author: one(users, {
    fields: [recipes.userId],
    references: [users.id],
  }),

  ingredients: many(recipeIngredients),
}));


/**
 * Relation ingrédient.
 *
 * Un ingrédient appartient à une seule recette.
 */
export const recipeIngredientsRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.id],
    }),
  })
);