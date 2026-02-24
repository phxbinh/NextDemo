// lib/auth/requireAdmin.ts
import { sql } from '../neon/sql';
import { ForbiddenError } from '../errors';

export async function requireAdmin(userId: string) {
  const rows = await sql`
    select role
    from profiles
    where user_id = ${userId}
    limit 1
  `;

  const role = (rows as { role: string }[])[0]?.role;

  if (role !== 'admin') {
    // trả về error của vercel
    //throw new Error('FORBIDDEN');

    // Trả về error custom
    //throw new ForbiddenError();
  }

  return role === 'admin';
}




