// lib/auth/sync-user.ts
import { sql } from '../db';

export async function createUserIfNotExists(id: string, email: string) {
  await sql`
    insert into users (id, email)
    values (${id}, ${email})
    on conflict (id) do nothing
  `;
}