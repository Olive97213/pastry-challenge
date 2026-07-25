import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { timestamps } from "./common";
import { userRoleEnum } from "./enums";

export const users = pgTable("users", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  username: varchar("username", {
    length: 30,
  })
    .notNull()
    .unique(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  passwordHash: text("password_hash"),

  emailVerified: timestamp("email_verified", {
    withTimezone: true,
    mode: "date",
  }),

  image: text("image"),

  bio: text("bio"),

  role: userRoleEnum("role")
    .default("USER")
    .notNull(),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  lastLoginAt: timestamp("last_login_at", {
    withTimezone: true,
    mode: "date",
  }),

  ...timestamps,
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;