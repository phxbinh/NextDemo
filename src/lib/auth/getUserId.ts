import { supabaseServerComponent } from '@/lib/supabase/server';
import { UnauthorizedError } from '@/lib/errors';

export async function getCurrentUserId(): Promise<string> {
  const supabase = supabaseServerComponent();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new UnauthorizedError();
  }

  return user.id;
}