import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import * as commentsRepo from '@/lib/server/api/comments.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (req: NextRequest) => {
  const session = requireAuth(req);
  const comments = await commentsRepo.byUser(session.userId);
  return NextResponse.json({ data: comments });
});
