// app/not-found.tsx (hoặc app/not-found.js)
/*
import { getServerSession } from 'next-auth'; // nếu dùng server component
// hoặc import { useSession } from 'next-auth/react'; nếu client

export default async function NotFound() {
  // Cách 1: Server Component + getServerSession (an toàn nhất cho static)
  const session = await getServerSession(); // trả về null nếu không có session

  // KHÔNG destructure trực tiếp nếu session undefined
  const isAuthenticated = !!session; // hoặc session?.user?.id !== undefined
  // const auth = session?.auth; // dùng optional chaining

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl mt-4">Trang không tồn tại!</p>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {isAuthenticated 
          ? 'Bạn có thể đang truy cập sai link.' 
          : 'Vui lòng đăng nhập để tiếp tục.'}
      </p>
      
      <a href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Về trang chủ
      </a>
    </div>
  );
}
*/



// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">
        Trang này không tồn tại hoặc đã bị xoá.
      </p>

      <Link
        href="/"
        className="rounded-md bg-black px-4 py-2 text-white hover:opacity-80"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}



