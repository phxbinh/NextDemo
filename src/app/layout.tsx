// src/app/layout.js

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Todo App Neon + Next.js',
  description: 'Simple Todo with Neon DB',
};

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full overflow-x-hidden">
      <body className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}


