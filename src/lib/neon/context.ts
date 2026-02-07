// lib/neon/context.ts
import { sql } from "./sql";

/**
 * Set app.user_id cho RLS
 * PHẢI gọi mỗi request
 */
/*
export async function withUserContext<T>(
  userId: string,
  fn: () => Promise<T>
): Promise<T> {
  // set local cho transaction hiện tại
  await sql`SET app.user_id = ${userId}`;
  return fn();
}
*/


// lib/neon/context.ts
//import { sql } from "./sql";

export async function withUserContext<T>(
  userId: string,
  fn: () => Promise<T>
): Promise<T> {
  // ⚠️ SET KHÔNG ĐƯỢC DÙNG BIND PARAM
  await sql.unsafe(`SET app.user_id = '${userId}'`);
  return fn();
}