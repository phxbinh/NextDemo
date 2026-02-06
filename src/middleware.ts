// middleware.ts
import { auth } from './lib/auth/server';

export default auth.middleware({
  loginUrl: '/login',
});

export const config = {
  matcher: ['/((?!login|signup|confirm|_next|favicon.ico).*)'],
};