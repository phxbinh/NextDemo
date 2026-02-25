// src/lib/neon/sql.ts
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}
export const sql = neon(process.env.DATABASE_URL);

export const sqlApp = neon(process.env.DATABASE_URL_APP!)
export const sqlAdmin = neon(process.env.DATABASE_URL!)