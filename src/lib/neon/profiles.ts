import { sql } from './sql';

export type Profile = {
  user_id: string;
  role: 'admin' | 'user';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export async function getAllProfiles(): Promise<Profile[]> {
  const rows = await sql<Profile[]>`
    select
      user_id,
      role,
      avatar_url,
      created_at,
      updated_at
    from profiles
    order by created_at desc
  `;
  return rows;
}