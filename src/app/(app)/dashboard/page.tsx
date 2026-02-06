/*
export default function DashboardPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-400">
        Trang dashboard cơ bản, chưa có data.
      </p>
    </section>
  );
}*/

/* chạy được với (chạy được) ở lib/supabase/server.ts
import { supabaseServer } from '../../../lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <h1>Welcome {user.email}</h1>;
}
*/

import { supabaseServerComponent } from '../../../lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = supabaseServerComponent();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return <h1>Welcome {user.email}</h1>;
}


