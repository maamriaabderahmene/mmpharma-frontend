import { NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { clearSessionCookie } from '@/lib/server/api/session';
import * as authService from '@/lib/server/api/auth.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = withApi(async () => {
  await authService.signOut();
  const cookie = clearSessionCookie();

  const response = NextResponse.json({ data: { message: 'Signed out successfully' } });
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
});
