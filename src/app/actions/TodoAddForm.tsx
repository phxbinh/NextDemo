'use client';

import { useFormState, useFormStatus } from "react-dom";
import { addTodoAction } from "../../lib/actions/addTodoAction";

const initialState = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {pending ? "Đang thêm..." : "Add"}
    </button>
  );
}

export default function TodoAddForm() {
  const [state, formAction] = useFormState(addTodoAction, initialState);

  return (
    <form action={formAction} className="mb-10 space-y-3">
      <input
        name="title"
        placeholder="Nhập todo mới..."
        className="w-full border rounded px-3 py-2"
      />

      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}