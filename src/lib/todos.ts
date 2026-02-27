
// src/lib/todos.ts
'use server'
import { sql } from "./neon/sql";
import { createSupabaseServerClient } from "./supabase/server";

export type Todo = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
};

export async function getTodos(): Promise<Todo[]> {
  const supabase = await createSupabaseServerClient();
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
  const supabase = await createSupabaseServerClient();

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
  const supabase = await createSupabaseServerClient();

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













