
import { requireAdmin } from './requireAdmin';
import { ForbiddenError } from '../errors';

export async function assertAdmin(userId: string) {
  if (!(await requireAdmin(userId))) {
    throw new ForbiddenError();
  }
}