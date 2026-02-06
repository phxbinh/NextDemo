import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  // 🔒 BẮT ĐĂNG NHẬP CHO (app)
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(
        new URL('/login', req.url)
      );
    }
  }

  // 🔁 ĐÃ LOGIN → KHÔNG CHO QUAY LẠI LOGIN / SIGNUP
  if (user && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(
      new URL('/dashboard', req.url)
    );
  }

  return res;
}