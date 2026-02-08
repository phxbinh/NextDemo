'use client';

export default function AdminError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-red-600">
        Admin error
      </h2>
      <p className="text-sm text-gray-500">{error.message}</p>

      <button
        onClick={reset}
        className="mt-4 rounded bg-black px-4 py-2 text-white"
      >
        Retry
      </button>
    </div>
  );
}