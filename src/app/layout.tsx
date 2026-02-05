// src/app/layout.js

import './globals.css';

export const metadata = {
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
    <html lang="vi">
      <body className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}

