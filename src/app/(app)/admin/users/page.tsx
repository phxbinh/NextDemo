
// Chạy phía client với useEffect
/*
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  user_id: string;
  avatar_url: string;
  role: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/users')
      .then(async (res) => {
        if (res.status === 401) {
          router.push('/login');
          return [];
        }

        if (res.status === 403) {
          router.push('/403');
          return [];
        }

        return res.json();
      })
      .then(setUsers)
      .catch(console.error);
  }, [router]);

  return (
    <ul>
      {users.map((u) => (
        <li key={u.user_id}>
          {u.avatar_url} — {u.role}
        </li>
      ))}
    </ul>
  );
}
*/

import { redirect } from 'next/navigation';

type User = {
  user_id: string;
  avatar_url: string;
  role: string;
};

export default async function AdminUsersPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/users`,
    {
      cache: 'no-store',
    }
  );

  if (res.status === 401) {
    redirect('/login');
  }

  if (res.status === 403) {
    redirect('/403');
  }

  const users: User[] = await res.json();

  return (
    <ul>
      {users.map((u) => (
        <li key={u.user_id}>
          {u.avatar_url} — {u.role}
        </li>
      ))}
    </ul>
  );
}









