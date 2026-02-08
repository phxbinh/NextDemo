
import { requireAdmin } from './requireAdmin';

export async function assertAdmin(userId: string) {
  if (!(await requireAdmin(userId))) {
    throw new ForbiddenError();
  }
}