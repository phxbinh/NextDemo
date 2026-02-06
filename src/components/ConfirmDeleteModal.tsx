'use client';

import { useState } from 'react';

export function ConfirmDeleteModal({ action, todoId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="group relative text-red-400/90 hover:text-red-300 font-medium text-sm tracking-tight transition-colors duration-200"
        type="button"
      >
        Xóa
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-red-400/60 group-hover:w-full transition-all duration-300 ease-out" />
      </button>

      {/* Modal backdrop + container */}
      {open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={() => setOpen(false)} // click ngoài để đóng
        >
          {/* Inner modal - stop propagation để không đóng khi click bên trong */}
          <div 
            className={`
              bg-zinc-900/95 backdrop-blur-md 
              border border-zinc-700/50 
              rounded-2xl p-6 sm:p-7 
              w-full max-w-md 
              shadow-2xl shadow-black/40 
              scale-95 opacity-0 
              animate-in fade-in zoom-in-95 duration-200
            `}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-zinc-100 tracking-tight">
                Xác nhận xóa
              </h2>
              
              {/* Icon close (tùy chọn) */}
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
                aria-label="Đóng"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-zinc-400/90 leading-relaxed mb-8">
              Hành động này sẽ xóa todo vĩnh viễn và không thể khôi phục.<br />
              Bạn có chắc chắn muốn tiếp tục?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className={`
                  px-5 py-2.5 rounded-lg font-medium text-sm
                  bg-zinc-800/70 hover:bg-zinc-700/70 
                  text-zinc-300 hover:text-white 
                  border border-zinc-700/50
                  transition-all duration-200 active:scale-97
                `}
              >
                Hủy
              </button>

              <form action={action}>
                <input type="hidden" name="id" value={todoId} />
                <button
                  type="submit"
                  className={`
                    px-5 py-2.5 rounded-lg font-medium text-sm
                    bg-red-600 hover:bg-red-500 active:bg-red-700
                    text-white shadow-sm shadow-red-900/30
                    transition-all duration-200 active:scale-97
                    focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:ring-offset-2 focus:ring-offset-zinc-900
                  `}
                >
                  Xóa ngay
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}