
// src/app/api/todos/images/route.ts
import { sql } from "../../../../lib/neon/sql";

export async function POST(req: Request) {
  const { todoId, paths } = await req.json();

  if (!todoId || !Array.isArray(paths)) {
    return new Response("Bad request", { status: 400 });
  }

  await sql`
    insert into todo_images (todo_id, image_path)
    select ${todoId}, p
    from unnest(${paths}::text[]) as p;
  `;

  return Response.json({ ok: true });
}