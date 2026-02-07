'use client'
import { signOut } from '../app/actions/auth';

export function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
      >
        Logout
      </button>
    </form>
  );
}