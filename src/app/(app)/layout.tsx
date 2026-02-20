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
{/*
    <main className="flex-1 overflow-y-auto px-4 py-6">
      {children}
    </main>
*/}

<main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-0 py-6">
  {children}
</main>

  </div>
</div>
)
}








