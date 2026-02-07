import { sql } from '../neon/sql';

export async function requireAdmin(userId: string) {
  const rows = await sql<{ role: string }[]>`
    select role
    from profiles
    where user_id = ${userId}
    limit 1
  `;

  if (!rows.length || rows[0].role !== 'admin') {
    throw new Error('FORBIDDEN');
  }
}