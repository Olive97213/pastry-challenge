import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
  path: ".env.local",
});

const databaseUrl =
  process.env.POSTGRES_URL_LOCAL ?? process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error(
    "❌ Missing database URL. Please define POSTGRES_URL_LOCAL (development) or POSTGRES_URL (production)."
  );
}

export default defineConfig({
  dialect: "postgresql",

  schema: "./src/db/schema",

  out: "./drizzle",

  schemaFilter: ["public"],

  verbose: true,

  strict: true,

  dbCredentials: {
    url: databaseUrl,
  },
});