// lib/neon/profiles.ts
import { sql, sqlApp } from './sql';

export type Profile = {
  user_id: string;
  role: 'admin' | 'user';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export async function getAllProfiles(): Promise<Profile[]> {
  const result = await sqlApp`SELECT current_user`
console.log(result)
  const rows = await sql`
    select
      user_id,
      role,
      avatar_url,
      created_at,
      updated_at
    from profiles
    order by created_at desc
  `;

  return rows as Profile[];
}