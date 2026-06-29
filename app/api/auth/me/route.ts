import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import * as usersRepo from '@/lib/server/api/users.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (req: NextRequest) => {
  const session = requireAuth(req);
  const user = await usersRepo.byId(session.userId);
  return NextResponse.json({ data: user });
});
