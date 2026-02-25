// lib/supabase/server.ts
import { createClient } from "@supabase/supabase-js";
import { cookies } from 'next/headers';
import {
  createServerComponentClient,
  createServerActionClient,
} from '@supabase/auth-helpers-nextjs';
import { createServerClient } from '@supabase/ssr'


/*
export function supabaseServerComponent() {
  return createServerComponentClient({ cookies });
}

export function supabaseServerAction() {
  return createServerActionClient({ cookies });
}
*/

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server only
);


// Thay thế cho hai functions được comment ở trên
// lib/supabase/server.ts
/*
export function supabaseServerComponent() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          cookieStore.set({ name, value, ...options })
        },
        remove: (name, options) => {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

export function supabaseServerAction() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          cookieStore.set({ name, value, ...options })
        },
        remove: (name, options) => {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
*/


// src/lib/supabase/server.ts
export function supabaseServerComponent() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(
          name: string,
          value: string,
          options: {
            path?: string
            maxAge?: number
            expires?: Date
            httpOnly?: boolean
            secure?: boolean
            sameSite?: 'lax' | 'strict' | 'none'
          }
        ) {
          cookieStore.set({ name, value, ...options })
        },
        remove(
          name: string,
          options: {
            path?: string
            maxAge?: number
            expires?: Date
            httpOnly?: boolean
            secure?: boolean
            sameSite?: 'lax' | 'strict' | 'none'
          }
        ) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}


export function supabaseServerAction() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(
          name: string,
          value: string,
          options: {
            path?: string
            maxAge?: number
            expires?: Date
            httpOnly?: boolean
            secure?: boolean
            sameSite?: 'lax' | 'strict' | 'none'
          }
        ) {
          cookieStore.set({ name, value, ...options })
        },
        remove(
          name: string,
          options: {
            path?: string
            maxAge?: number
            expires?: Date
            httpOnly?: boolean
            secure?: boolean
            sameSite?: 'lax' | 'strict' | 'none'
          }
        ) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}










