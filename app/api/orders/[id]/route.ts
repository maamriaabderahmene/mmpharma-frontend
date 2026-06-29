import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import * as ordersRepo from '@/lib/server/api/orders.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const session = requireAuth(req);
  const { id } = await params;
  const order = await ordersRepo.byId(id, session.userId);
  return NextResponse.json({ data: order });
});
