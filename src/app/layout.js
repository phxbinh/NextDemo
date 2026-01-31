// app/layout.js
//import './globals.css';

export const metadata = {
  title: 'Todo App Neon + Next.js',
  description: 'Simple Todo with Neon DB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-gray-50 min-h-screen">
        {children}  {/* Đây là nơi các page (như page.js) được render vào */}
      </body>
    </html>
  );
}