import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireRole } from '@/lib/server/api/session';
import { UserRole } from '@/lib/shared/constants/UserRole';
import * as articlesRepo from '@/lib/server/api/articles.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const filter = {
    status: searchParams.get('status') ?? undefined,
    tag: searchParams.get('tag') ?? undefined,
    q: searchParams.get('q') ?? undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 20,
  };
  const result = await articlesRepo.list(filter);
  return NextResponse.json({ data: result });
});

export const POST = withApi(async (req: NextRequest) => {
  requireRole(req, UserRole.EDITOR, UserRole.ADMIN);
  const body = await req.json();
  const article = await articlesRepo.create(body);
  return NextResponse.json({ data: article }, { status: 201 });
});
