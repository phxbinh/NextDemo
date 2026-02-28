
/*
'use client';

import { signUp } from '../../actions/auth';
import { useState } from 'react';


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

// src/app/(public)/signup/page.tsx
'use client';

import { useActionState } from 'react';
import { signUp } from '../../actions/auth';

type FormState =
  | {
      error?: string;
      success?: boolean;
      message?: string;
    }
  | null;

export default function SignupPage() {
  const [state, formAction, isPending] =
    useActionState<FormState>(signUp, null);

  return (
    <form
      action={formAction}
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

      {/* Error */}
      {state?.error && (
        <p className="text-red-500 text-sm">
          {state.error}
        </p>
      )}

      {/* Success */}
      {state?.success && (
        <p className="text-green-600 text-sm">
          {state.message ??
            'Đăng ký thành công! Kiểm tra email để xác nhận.'}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-black text-white p-2 disabled:opacity-50"
      >
        {isPending ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}







