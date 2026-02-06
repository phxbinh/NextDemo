'use client';

import { useState } from 'react';

export function ConfirmDeleteModal({ action, todoId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Nút mở modal */}
      <button
        onClick={() => setOpen(true)}
        className="text-red-400 hover:text-red-300 font-medium"
      >
        Xóa
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              Xác nhận xóa
            </h2>

            <p className="text-gray-400 mb-6">
              Todo này sẽ bị xóa vĩnh viễn. Chắc chưa?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
              >
                Hủy
              </button>

              <form action={action}>
                <input type="hidden" name="id" value={todoId} />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white"
                >
                  Xóa
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}