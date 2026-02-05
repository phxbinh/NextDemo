// src/app/layout.js

import './globals.css';

export const metadata = {
  title: 'Todo App Neon + Next.js',
  description: 'Simple Todo with Neon DB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-gray-50 min-h-screen">
        {children}  
      </body>
    </html>
  );
}



/*
//'use client'; // Vì cần state cho toggle sidebar trên mobile

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
//import Navbar from '@/components/Navbar'; // nếu có
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="vi">
      <body className="flex min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 text-gray-100">
      
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0 md:shadow-2xl md:shadow-cyan-900/30`}
        >
          <Sidebar />
        </div>

     
        <div className="flex-1 flex flex-col">
          
          <header className="md:hidden sticky top-0 z-40 bg-black/40 backdrop-blur-xl border-b border-cyan-500/30">
            <div className="flex items-center justify-between px-4 h-16">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-cyan-400 focus:outline-none"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isSidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                Neon JS
              </div>

              <div className="w-8" /> 
            </div>
          </header>

          
          <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-0' : 'md:ml-64'}`}>
            {children}
          </main>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </body>
    </html>
  );
}
*/


