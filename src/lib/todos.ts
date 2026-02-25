'use server'
import { sql } from "./neon/sql";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerClient } from "@supabase/ssr";

export type Todo = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
};



async function supabaseServerAction() {
  const cookieStore = await cookies()

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




function getSupabase() {
  return createServerComponentClient({ cookies });
}


export async function getTodos(): Promise<Todo[]> {
  //const supabase = getSupabase();
  const supabase = await supabaseServerAction();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const rows = (await sql`
    select id, title, content, created_at
    from todosimages
    where user_id = ${user.id}
    order by created_at desc
  `) as Todo[];

  return rows;
}

export async function addTodo({
  title,
  content = null,
}: {
  title: string;
  content?: string | null;
}) {
  const supabase = getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await sql`
    insert into todosimages (user_id, title, content)
    values (${user.id}, ${title}, ${content})
  `;
}

export type TodoWithImages = Todo & {
  images: { image_path: string }[];
};

export async function getTodosWithImages(): Promise<TodoWithImages[]> {
  const supabase = getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const rows = await sql`
    select
      t.id,
      t.title,
      t.content,
      t.created_at,
      coalesce(
        json_agg(
          json_build_object('image_path', i.image_path)
        ) filter (where i.id is not null),
        '[]'
      ) as images
    from todosimages t
    left join todo_images i on i.todo_id = t.id
    where t.user_id = ${user.id}
    group by t.id
    order by t.created_at desc
  `;

  return rows as TodoWithImages[];
}













