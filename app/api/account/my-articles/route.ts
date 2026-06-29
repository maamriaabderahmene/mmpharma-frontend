import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import * as articlesRepo from '@/lib/server/api/articles.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (req: NextRequest) => {
  const session = requireAuth(req);
  const articles = await articlesRepo.byAuthor(session.userId);
  return NextResponse.json({ data: articles });
});
