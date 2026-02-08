
import { requireAdmin } from './requireAdmin';
import { ForbiddenError } from '../errors';

/*
export async function assertAdmin(userId: string) {
  if (!(await requireAdmin(userId))) {
    throw new ForbiddenError();
  }
}
*/

// lib/auth/assertAdmin.ts
export async function assertAdmin(userId: string) {
  try {
    await requireAdmin(userId);
  } catch {
    throw new ForbiddenError();
  }
}




