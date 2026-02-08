// src/app/403/page.tsx
import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-4xl font-bold">403</h1>

        <p className="text-gray-600">
          Bạn không có quyền truy cập trang này.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded bg-black text-white"
          >
            Về trang chủ
          </Link>

          <Link
            href="/login"
            className="px-4 py-2 rounded border"
          >
            Đăng nhập lại
          </Link>
        </div>
      </div>
    </div>
  );
}