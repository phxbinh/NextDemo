import { sql } from "./neon/sql";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export type Todo = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
};

/**
 * Lấy todos của user hiện tại
 */
export async function getTodos(): Promise<Todo[]> {
  const supabase = createServerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const rows = await sql<Todo[]>`
    select id, title, content, created_at
    from todoimages
    where user_id = ${user.id}
    order by created_at desc
  `;

  return rows;
}

/**
 * Thêm todo mới cho user hiện tại
 */
export async function addTodo({
  title,
  content = null,
}: {
  title: string;
  content?: string | null;
}) {
  const supabase = createServerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await sql`
    insert into todoimages (user_id, title, content)
    values (${user.id}, ${title}, ${content})
  `;
}