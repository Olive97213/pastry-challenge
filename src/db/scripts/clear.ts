#!/usr/bin/env node

import pg from "pg";
import { config } from "dotenv";

config({
  path: ".env.local",
});

const clearDb = async () => {
  const databaseUrl = process.env.POSTGRES_URL_LOCAL;

  if (!databaseUrl) {
    throw new Error(
      "POSTGRES_URL_LOCAL is not defined in .env.local"
    );
  }

  const client = new pg.Client({
    connectionString: databaseUrl,
  });

  console.log("⏳ Checking connection...");
  console.log(`🗄️ Database: pastry`);

  await client.connect();

  const start = Date.now();

  /**
   * Suppression des tables
   */
  await client.query(`
    DO $$ 
    DECLARE 
      r RECORD;
    BEGIN
      FOR r IN (
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
      ) LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' 
        || quote_ident(r.tablename) 
        || ' CASCADE';
      END LOOP;
    END $$;
  `);


  /**
   * Suppression des ENUM PostgreSQL
   */
  await client.query(`
    DO $$ 
    DECLARE 
      r RECORD;
    BEGIN
      FOR r IN (
        SELECT typname 
        FROM pg_type 
        WHERE typtype = 'e'
      ) LOOP
        EXECUTE 'DROP TYPE IF EXISTS public.'
        || quote_ident(r.typname)
        || ' CASCADE';
      END LOOP;
    END $$;
  `);


  const end = Date.now();

  console.log(
    `✅ Database cleared in ${end - start} ms`
  );

  await client.end();

  process.exit(0);
};


try {
  await clearDb();
} catch (error) {
  console.error("❌ Database reset failed");
  console.error(error);

  process.exit(1);
}