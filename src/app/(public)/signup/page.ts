'use client';

import { signUp } from '../../actionsAuth/auth';
import { useState } from 'react';

/*
export default function SignupPage() {
  const [message, setMessage] = useState<string | null>(null);

  async function action(formData: FormData) {
    const res = await signUp(formData);
    if (res?.error) setMessage(res.error);
    else setMessage('Check your email to confirm signup');
  }

  return (
    <form
      action={action}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full border p-2"
      />

      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        className="w-full border p-2"
      />

      {message && <p>{message}</p>}

      <button className="w-full bg-black text-white p-2">
        Sign Up
      </button>
    </form>
  );
}
*/


export default function SignupPage() {
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signUp(formData);
    if (res?.error) setMessage(res.error);
    else setMessage('Check your email to confirm signup');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <input name="email" type="email" required className="border p-2 w-full" />
      <input name="password" type="password" required className="border p-2 w-full" />

      {message && <p>{message}</p>}

      <button type="submit" className="bg-black text-white p-2 w-full">
        Sign Up
      </button>
    </form>
  );
}





