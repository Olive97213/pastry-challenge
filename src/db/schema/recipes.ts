import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users";
import {
  recipeDifficultyEnum,
  recipeStatusEnum,
} from "./enums";

import { timestamps } from "./common";


/**
 * Table principale des recettes.
 *
 * Une recette appartient à un utilisateur.
 * Elle peut être privée (DRAFT) ou publique (PUBLISHED).
 */
export const recipes = pgTable("recipes", {

  /**
   * Identifiant unique de la recette.
   */
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),


  /**
   * Auteur de la recette.
   *
   * La suppression d'un utilisateur supprimera
   * également ses recettes.
   */
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),


  /**
   * Nom affiché de la recette.
   */
  title: varchar("title", {
    length: 150,
  })
    .notNull(),


  /**
   * Identifiant utilisé dans les URLs.
   *
   * Exemple :
   * "tarte-citron-meringuee"
   */
  slug: varchar("slug", {
    length: 180,
  })
    .notNull()
    .unique(),


  /**
   * Présentation courte de la recette.
   */
  description: text("description")
    .notNull(),


  /**
   * Étapes détaillées de réalisation.
   */
  instructions: text("instructions")
    .notNull(),


  /**
   * Temps en minutes.
   */
  prepTime: integer("prep_time")
    .notNull(),


  /**
   * Temps de cuisson en minutes.
   */
  cookTime: integer("cook_time"),


  /**
   * Temps de repos en minutes.
   */
  restTime: integer("rest_time"),


  /**
   * Nombre de portions réalisées.
   */
  servings: integer("servings")
    .notNull(),


  /**
   * Niveau de difficulté.
   */
  difficulty: recipeDifficultyEnum("difficulty")
    .default("BEGINNER")
    .notNull(),


  /**
   * Gestion de la visibilité.
   *
   * DRAFT      -> privée
   * PUBLISHED  -> publique
   * ARCHIVED   -> masquée
   */
  status: recipeStatusEnum("status")
    .default("DRAFT")
    .notNull(),


  /**
   * Image principale de la recette.
   *
   * Pour le MVP on stocke simplement une URL.
   */
  image: text("image"),


  /**
   * Date de publication.
   */
  publishedAt: timestamp("published_at", {
    withTimezone: true,
    mode: "date",
  }),


  ...timestamps,

});


export type Recipe =
  typeof recipes.$inferSelect;


export type InsertRecipe =
  typeof recipes.$inferInsert;