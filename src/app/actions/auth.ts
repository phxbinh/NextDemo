// sec/app/actions/auth.ts
'use server';

import { redirect } from 'next/navigation';
import {
  supabaseServerAction,
  supabaseServerComponent,
} from '../../lib/supabase/server';

import { syncUser, ensureProfile } from '../../lib/neon/users';

/**
 * SIGN UP
 * - Supabase tạo user
 * - KHÔNG sync Neon ở đây (chưa login / chưa verify email)
 */
export async function signUp(formData: FormData) {
  const supabase = supabaseServerComponent();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signIn(formData: FormData) {
  const supabase = supabaseServerAction();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Auth session not found' };
  }

  // ✅ SYNC SUPABASE → NEON (KHÔNG CONTEXT)
  await syncUser({
    id: user.id,
    email: user.email!,
  });

  await ensureProfile(user.id);

  redirect('/dashboard');
}

/**
 * SIGN OUT
 * - Chỉ logout Supabase
 * - Neon tự chặn bằng RLS
 */
export async function signOut() {
  const supabase = supabaseServerAction();

  await supabase.auth.signOut();

  redirect('/login');
}






