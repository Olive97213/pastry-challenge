import {
  pgTable,
  text,
  timestamp,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    type: text("type").notNull(),

    provider: text("provider").notNull(),

    providerAccountId: text("provider_account_id")
      .notNull(),

    refreshToken: text("refresh_token"),

    accessToken: text("access_token"),

    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }),

    tokenType: text("token_type"),

    scope: text("scope"),

    idToken: text("id_token"),

    sessionState: text("session_state"),
  },
  (table) => [
    primaryKey({
      columns: [
        table.provider,
        table.providerAccountId,
      ],
    }),
  ]
);