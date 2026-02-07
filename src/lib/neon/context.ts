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

// lib/neon/context.ts


export async function withUserContext<T>(
  userId: string,
  fn: () => Promise<T>
): Promise<T> {
  // Neon cho phép SET LOCAL trong transaction
  await sql`BEGIN`;
  await sql`SET LOCAL app.user_id = ${userId}`;

  try {
    const result = await fn();
    await sql`COMMIT`;
    return result;
  } catch (err) {
    await sql`ROLLBACK`;
    throw err;
  }
}