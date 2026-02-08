'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  user_id: string;
  email: string;
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
          {u.email} — {u.role}
        </li>
      ))}
    </ul>
  );
}