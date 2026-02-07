// app/api/auth/session/route.ts
/*
import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase/server";
import { withUserContext } from "../../../../lib/neon/context";
import { syncUser, ensureProfile } from "../../../../lib/neon/users";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  const jwt = auth.replace("Bearer ", "");

  const { data, error } = await supabaseServer.auth.getUser(jwt);
  if (error || !data.user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = data.user;

  await withUserContext(user.id, async () => {
    await syncUser({
      id: user.id,
      email: user.email!,
    });

    await ensureProfile(user.id);
  });

  return NextResponse.json({ ok: true });
}
*/

import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase/server";
import { syncUser, ensureProfile } from "../../../../lib/neon/users";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  const jwt = auth.replace("Bearer ", "");

  const { data, error } = await supabaseServer.auth.getUser(jwt);

  if (error || !data.user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = data.user;

  // ✅ SYNC SUPABASE → NEON (NO CONTEXT, NO SESSION)
  await syncUser({
    id: user.id,
    email: user.email!,
  });

  await ensureProfile(user.id);

  return NextResponse.json({ ok: true });
}





