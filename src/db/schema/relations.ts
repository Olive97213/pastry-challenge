import { relations } from 'drizzle-orm';

import { users } from './users';
import { accounts } from './accounts';
import { sessions } from './sessions';
import { recipes } from './recipes';
import { recipeIngredients } from './recipeIngredients';
import { recipePreparations } from './recipePreparations';
import { recipeSteps } from './recipeSteps';

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
 * - appartient à un utilisateur ;
 * - possède plusieurs préparations.
 */
export const recipesRelations = relations(recipes, ({ one, many }) => ({
  /**
   * Auteur de la recette.
   */
  author: one(users, {
    fields: [recipes.userId],
    references: [users.id],
  }),

  /**
   * Préparations de la recette.
   */
  preparations: many(recipePreparations),
}));

/**
 * Relation ingrédient.
 *
 * Un ingrédient appartient à une seule préparation.
 */
export const recipeIngredientsRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    /**
     * Préparation propriétaire
     * de cet ingrédient.
     */
    preparation: one(recipePreparations, {
      fields: [recipeIngredients.preparationId],
      references: [recipePreparations.id],
    }),
  }),
);
/**
 * Relations des préparations.
 *
 * Une préparation :
 * - appartient à une recette ;
 * - possède plusieurs ingrédients.
 */
export const recipePreparationsRelations = relations(
  recipePreparations,
  ({ one, many }) => ({
    recipe: one(recipes, {
      fields: [recipePreparations.recipeId],
      references: [recipes.id],
    }),

    ingredients: many(recipeIngredients),
    /**
     * Étapes de réalisation
     * de cette préparation.
     */
    steps: many(recipeSteps),
  }),
);

/**
 * Relations des étapes.
 *
 * Une étape appartient
 * à une seule préparation.
 */
export const recipeStepsRelations = relations(recipeSteps, ({ one }) => ({
  /**
   * Préparation propriétaire
   * de cette étape.
   */
  preparation: one(recipePreparations, {
    fields: [recipeSteps.preparationId],
    references: [recipePreparations.id],
  }),
}));
