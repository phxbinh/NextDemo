// lib/supabase/server.ts
import { createClient } from "@supabase/supabase-js";
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

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server only
);



