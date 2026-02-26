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

/*
const rowss = await sqlApp`SELECT * FROM rls_test`
console.log(rowss) //-> []
*/

/*
await sqlApp`BEGIN`
await sqlApp`SET LOCAL app.user_id = '11111111-1111-1111-1111-111111111111'`
const rowss = await sqlApp`SELECT * FROM rls_test`
await sqlApp`COMMIT`

console.log(rowss)
*/

/*
await sqlApp`BEGIN`
await sqlApp`SET LOCAL app.user_id = '11111111-1111-1111-1111-111111111111'`
const rowss = await sqlApp`SELECT * FROM rls_test`
await sqlApp`COMMIT`
console.log(rowss)
*/

const result = await sqlApp.transaction((tx) => [
  tx`SET LOCAL app.user_id = '11111111-1111-1111-1111-111111111111'`,
  tx`SELECT * FROM rls_test`
])

console.log("result: ", result[1])

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







// lib/neon/profiles.ts
//import { withUserContext } from './userContext'
/*
export type Profile = {
  user_id: string
  role: 'admin' | 'user'
  avatar_url: string | null
  created_at: string
  updated_at: string
}
*/

/*
export async function withUserContext<T>(
  userId: string,
  queryFn: (tx: any) => any
): Promise<T> {
  const results = await sqlApp.transaction((tx) => [
    tx`SET LOCAL app.user_id = ${userId}`,
    queryFn(tx),
  ])

  // index 0 = SET LOCAL
  // index 1 = actual query result
  return results[1] as T
}
*/

export async function withUserContext_<T>(
  userId: string,
  queryFn: (tx: any) => any
): Promise<T> {

  const results = await sqlApp.transaction((tx) => [
    tx`SELECT set_config('app.user_id', ${userId}, true)`,
    queryFn(tx),
  ])
console.log("userId: ", userId);
  return results[1] as T
}

export async function withUserContext<T>(
  userId: string,
  queryFn: (tx: any) => any
): Promise<T> {

  const results = await sqlApp.transaction((tx) => [
    tx(`SET LOCAL app.user_id = '${userId}'`),
    queryFn(tx),
  ])

  return results[1] as T
}




export async function getAllProfiles_(
  userId: string
): Promise<Profile[]> {
  return withUserContext<Profile[]>(userId, (tx) =>
    tx`
      select
        user_id,
        role,
        avatar_url,
        created_at,
        updated_at
      from profiles
      order by created_at desc
    `
  )
}




