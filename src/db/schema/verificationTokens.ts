import { pgTable, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),

    token: text('token').notNull(),

    expires: timestamp('expires', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.identifier, table.token],
    }),
  ],
);
