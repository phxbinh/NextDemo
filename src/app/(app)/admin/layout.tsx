// app/(app)/admin/layout.tsx
import { redirect } from 'next/navigation';
import Link from "next/link";
import { supabaseServerComponent } from '../../../lib/supabase/server';
import { requireAdmin } from '../../../lib/auth/requireAdmin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1️⃣ Lấy user từ Supabase session
  const supabase = supabaseServerComponent();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 2️⃣ Check role admin bằng Neon
  await requireAdmin(user.id);

  // 3️⃣ OK → render toàn bộ admin routes
  return (
    <div className="min-h-screen">
      <header className="border-b p-4 font-bold">
        Admin Panel
      </header>

      <Link
        href="/admin/profiles"
        className="rounded-md bg-black px-4 py-2 text-white hover:opacity-80"
      >
        Profiles users
      </Link>

      <main className="p-6">{children}</main>
    </div>
  );
}