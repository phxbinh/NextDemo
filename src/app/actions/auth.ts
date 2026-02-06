'use server';

import { supabaseServer } from '../lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabaseServer.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Supabase mặc định gửi email confirm
  return { success: true };
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabaseServer.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function signOut() {
  await supabaseServer.auth.signOut();
  redirect('/login');
}