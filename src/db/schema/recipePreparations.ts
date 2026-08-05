import { integer, pgTable, uuid, varchar, text } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';
import { timestamps } from './common';

/**
 * Préparations d'une recette.
 *
 * Exemples :
 * - Pâte sucrée
 * - Crémeux citron
 * - Mousse vanille
 * - Glaçage
 * - Montage
 */
export const recipePreparations = pgTable('recipe_preparations', {
  /**
   * Identifiant.
   */
  id: uuid('id').defaultRandom().primaryKey(),

  /**
   * Recette associée.
   */
  recipeId: uuid('recipe_id')
    .notNull()
    .references(() => recipes.id, {
      onDelete: 'cascade',
    }),

  /**
   * Nom de la préparation.
   */
  title: varchar('title', {
    length: 150,
  }).notNull(),

  /**
   * Description de la préparation.
   *
   * Permet d'ajouter des précisions
   * avant la liste des ingrédients.
   *
   */
  description: text('description'),

  /**
   * Ordre d'affichage.
   */
  position: integer('position').notNull().default(0),

  ...timestamps,
});

export type RecipePreparation = typeof recipePreparations.$inferSelect;

export type InsertRecipePreparation = typeof recipePreparations.$inferInsert;
