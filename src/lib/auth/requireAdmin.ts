// lib/auth/requireAdmin.ts
import { sql } from '../neon/sql';

export async function requireAdmin(userId: string) {
  const rows = await sql`
    select role
    from profiles
    where user_id = ${userId}
    limit 1
  `;

  const role = (rows as { role: string }[])[0]?.role;

  if (role !== 'admin') {
    throw new Error('FORBIDDEN');
  }
}