import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { buildSessionCookie } from '@/lib/server/api/session';
import * as authService from '@/lib/server/api/auth.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = withApi(async (req: NextRequest) => {
  const body = await req.json();
  const { user, session } = await authService.signUp(body);
  const cookie = buildSessionCookie(session);

  const response = NextResponse.json({ data: user }, { status: 201 });
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
});
