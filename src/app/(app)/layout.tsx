// app/(app)/layout.tsx
/*
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
    
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0`}
      >
        <Sidebar />
      </div>


      <div className="flex-1 flex flex-col">
  
        <header className="md:hidden sticky top-0 z-40 bg-black/40 backdrop-blur">
          <div className="flex items-center px-4 h-16">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              ☰
            </button>
            <span className="ml-4 font-bold">Neon JS</span>
          </div>
        </header>

        <main className="flex-1 md:ml-64">{children}</main>
      </div>
    </div>
  );
}
*/



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
    <div className="flex min-h-screen relative">
      {/* Overlay – click ngoài là đóng (mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0`}
        onClick={(e) => e.stopPropagation()}
      >
        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
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

        <main className="flex-1
      min-h-screen
      overflow-y-auto
      px-4 py-6
      md:ml-64
">
          {children}
        </main>
      </div>
    </div>
  );
}






