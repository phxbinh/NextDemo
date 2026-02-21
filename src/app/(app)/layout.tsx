// app/(app)/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Đóng sidebar khi chuyển route
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);
return (
  <div className="flex min-h-screen w-full overflow-x-hidden">
    {/* Backdrop chỉ mobile */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}

    {/* Sidebar */}
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex-shrink-0
      `}
    >
      <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
    </aside>

    {/* Main content area */}
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header chỉ mobile */}
      <header className="md:hidden sticky top-0 z-30 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setIsSidebarOpen((v) => !v)}
            className="text-2xl text-white p-2 -ml-2"
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <span className="font-bold text-lg">Neon JS</span>
          <div className="w-10" /> {/* giả spacer bên phải */}
        </div>
      </header>

      {/* Nội dung chính – đẩy sang phải khi sidebar mở trên desktop */}
      <main
        className={`
          flex-1 overflow-y-auto overflow-x-hidden
          md:pl-0 transition-all duration-300
          ${isSidebarOpen ? 'md:ml-64' : ''}
        `}
      >
        <div className="px-4 py-6 md:px-8">
          {children}
        </div>
      </main>
    </div>
  </div>
);
}
/*
return (
<div className="flex min-h-screen w-full overflow-x-hidden">
  {isSidebarOpen && (
    <div
      className="fixed inset-0 z-40 bg-black/50 md:hidden"
      onClick={() => setIsSidebarOpen(false)}
    />
  )}

  <div
    className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0 md:flex-shrink-0`}
  >
    <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
  </div>

  <div className="flex-1 flex flex-col">
    <header className="md:hidden sticky top-0 z-30 bg-black/40 backdrop-blur">
      <div className="flex items-center px-4 h-16">
        <button
          onClick={() => setIsSidebarOpen((v) => !v)}
          className="text-xl"
        >
          ☰
        </button>
        <span className="ml-4 font-bold">Neon JS</span>
      </div>
    </header>

  <div className="flex-1 flex flex-col overflow-hidden">
    <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-2 py-6">
      {children}
    </main>
  </div>

  </div>
</div>
)
}
*/







