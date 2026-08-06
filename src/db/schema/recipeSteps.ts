import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { recipePreparations } from './recipePreparations';
import { timestamps } from './common';

/**
 * Étapes de réalisation
 * d'une préparation.
 *
 * Chaque préparation possède
 * zéro, une ou plusieurs étapes.
 *
 * Exemple :
 *
 * Préparation :
 * "Crémeux citron"
 *
 * Étapes :
 * 1. Chauffer le jus.
 * 2. Ajouter les œufs.
 * 3. Cuire à 82°C.
 * 4. Ajouter le beurre.
 */
export const recipeSteps = pgTable('recipe_steps', {
  /**
   * Identifiant unique
   * de l'étape.
   */
  id: uuid('id').defaultRandom().primaryKey(),

  /**
   * Préparation à laquelle
   * appartient cette étape.
   */
  preparationId: uuid('preparation_id')
    .notNull()
    .references(() => recipePreparations.id, {
      onDelete: 'cascade',
    }),

  /**
   * Description de l'étape.
   *
   * Exemple :
   * "Ajouter progressivement le beurre."
   */
  description: text('description').notNull(),

  /**
   * Ordre d'affichage.
   */
  position: integer('position').notNull().default(0),

  ...timestamps,
});

export type RecipeStep = typeof recipeSteps.$inferSelect;

export type InsertRecipeStep = typeof recipeSteps.$inferInsert;
