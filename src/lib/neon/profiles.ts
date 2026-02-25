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
  //const result = await sqlApp`SELECT current_user`
  //console.log(result) //-> app_user

const rowss = await sqlApp`SELECT * FROM rls_test`
console.log(rowss) //-> []

/*
await sqlApp`BEGIN`
await sqlApp`SET LOCAL app.user_id = '11111111-1111-1111-1111-111111111111'`
const rowss = await sqlApp`SELECT * FROM rls_test`
await sqlApp`COMMIT`

console.log(rowss)
*/





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