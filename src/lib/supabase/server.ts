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

/* chạy được
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';


export function supabaseServer() {
  console.log('SUPABASE_URL =', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_KEY =', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return createServerComponentClient({
    cookies,
  });
}
*/


import { cookies } from 'next/headers';
import {
  createServerComponentClient,
  createServerActionClient,
} from '@supabase/auth-helpers-nextjs';

export function supabaseServerComponent() {
  return createServerComponentClient({ cookies });
}

export function supabaseServerAction() {
  return createServerActionClient({ cookies });
}



