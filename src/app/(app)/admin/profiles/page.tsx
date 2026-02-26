
// src/app/(app)/admin/profiles/page.tsx 
import { redirect } from 'next/navigation';
import { getAllProfiles, getAllProfiles_ } from '@/lib/neon/profiles';

import { createSupabaseServerClient } from '@/lib/supabase/server';



export default async function AdminProfilesPage() {

  const supabase = await createSupabaseServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

 if (!user) {
    redirect('/login')
  }

  const profiles_ = await getAllProfiles();
const profiles = await getAllProfiles_(user.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profiles: Profiles page: /admin/profiles</h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">User ID</th>
            <th className="border px-2 py-1">Role</th>
            <th className="border px-2 py-1">Avatar</th>
            <th className="border px-2 py-1">Created</th>
            <th className="border px-2 py-1">Updated</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((p) => (
            <tr key={p.user_id}>
              <td className="border px-2 py-1 font-mono text-xs">
                {p.user_id}
              </td>
              <td className="border px-2 py-1">
                <span
                  className={
                    p.role === 'admin'
                      ? 'text-red-600 font-semibold'
                      : ''
                  }
                >
                  {p.role}
                </span>
              </td>
              <td className="border px-2 py-1">
                {p.avatar_url ? (
                  <img
                    src={p.avatar_url}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="border px-2 py-1">
                {new Date(p.created_at).toLocaleString()}
              </td>
              <td className="border px-2 py-1">
                {new Date(p.updated_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}