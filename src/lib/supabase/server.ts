// lib/supabase/server.ts
/*
import { createClient } from '@supabase/supabase-js';

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
*/
/*
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export function supabaseServer() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value;
        },
      },
    }
  );
}
*/

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';


export function supabaseServer() {
  console.log('SUPABASE_URL =', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_KEY =', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return createServerComponentClient({
    cookies,
  });
}




