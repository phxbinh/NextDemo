// src/app/api/todos/images/precheck/route.ts
import { sql } from "../../../../../lib/neon/sql";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: Request) {
  const supabase = await createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { todoId } = await req.json();

  const rows = await sql`
    select 1
    from todosimages
    where id = ${todoId}
      and user_id = ${user.id}
      and status = 'active'
  `;

  if (rows.length === 0) {
    return new Response("Forbidden", { status: 403 });
  }

  return Response.json({ ok: true });
}






