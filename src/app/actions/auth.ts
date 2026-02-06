/*
'use server';

import { supabaseServer } from '../../lib/supabase/server';
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
*/


'use server';
import { supabaseServerAction } from '../../lib/supabase/server';
//import { supabaseServer } from '../../lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  const supabase = supabaseServerAction(); // ✅ GỌI FUNCTION

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

/* chạy được với (chạy được) ở lib/supabase/server.ts
export async function signIn(formData: FormData) {
  const supabase = supabaseServer(); // ✅
 console.log('SUPABASE_URL =', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_KEY =', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}
*/


export async function signIn(formData: FormData) {
  const supabase = supabaseServerAction(); // 🔴 BẮT BUỘC

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };

  redirect('/dashboard');
}


export async function signOut() {
  const supabase = supabaseServerAction(); // ✅

  await supabase.auth.signOut();
  redirect('/login');
}





