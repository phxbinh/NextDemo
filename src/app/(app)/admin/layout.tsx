// app/(app)/admin/layout.tsx
import { requireAdmin } from '../../../lib/auth/requireAdmin';
import { getServerUser } from '../../../lib/auth/getServerUser';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  if (!user) {
    redirect('/login');
  }

  // 🔐 CHECK ROLE
  await requireAdmin(user.id);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold">Admin</h2>
        <nav className="mt-4 space-y-2">
          <a href="/admin">Dashboard</a>
          <a href="/admin/profiles">Users</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}