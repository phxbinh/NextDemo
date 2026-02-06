'use client';

import { signOut } from '../app/actions/auth';

export function LogoutButton() {
  return (
    <form action={signOut}>
      <button className="text-red-500">Logout</button>
    </form>
  );
}