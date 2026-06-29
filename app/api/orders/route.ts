import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import * as ordersRepo from '@/lib/server/api/orders.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (req: NextRequest) => {
  const session = requireAuth(req);
  const { searchParams } = new URL(req.url);
  const filter = {
    status: searchParams.get('status') ?? undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 20,
  };
  const result = await ordersRepo.list(session.userId, filter);
  return NextResponse.json({ data: result });
});
