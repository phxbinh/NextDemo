
// Ví dụ: /app/api/admin/users/route.ts

import { NextResponse } from 'next/server';
import { supabaseServerComponent } from '../../../../lib/supabase/server';
import { assertAdmin } from '../../../../lib/auth/assertAdmin';
import { sql } from '../../../../lib/neon/sql';
import { ForbiddenError } from '../../../../lib/errors';

export async function GET() {
  const supabase = supabaseServerComponent();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // 🔐 check quyền
    await assertAdmin(user.id);

    // ✅ chỉ admin mới tới đây
    const users = await sql`
      select user_id, email, role
      from profiles
      order by created_at desc
    `;

    return NextResponse.json(users);
  } catch (err) {
    if (err instanceof ForbiddenError) {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      );
    }

    throw err; // 500
  }
}