'use client';

import { signOut } from '../app/actionsAuth/auth';

export function LogoutButton() {
  return (
    <form action={signOut}>
      <button className="text-red-500">Logout</button>
    </form>
  );
}