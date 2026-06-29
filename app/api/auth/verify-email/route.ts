import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import * as authService from '@/lib/server/api/auth.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = withApi(async (req: NextRequest) => {
  const { token } = await req.json();
  await authService.verifyEmail(token);
  return NextResponse.json({ data: { message: 'Email verified successfully' } });
});
