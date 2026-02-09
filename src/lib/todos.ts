import { sql } from "./neon/sql";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export type Todo = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
};

function getSupabase() {
  return createServerComponentClient({ cookies });
}

export async function getTodos(): Promise<Todo[]> {
  const supabase = getSupabase();

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