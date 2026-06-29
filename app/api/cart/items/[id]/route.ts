import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import * as cartsRepo from '@/lib/server/api/carts.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const PATCH = withApi(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const session = requireAuth(req);
  const { id } = await params;
  const cart = await cartsRepo.byUser(session.userId);
  if (!cart) {
    return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Cart not found' } }, { status: 404 });
  }
  const { quantity } = await req.json();
  const updated = await cartsRepo.updateItem(
    (cart as unknown as { _id: string })._id ?? (cart as unknown as { id: string }).id,
    id,
    quantity,
  );
  return NextResponse.json({ data: updated });
});

export const DELETE = withApi(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const session = requireAuth(req);
  const { id } = await params;
  const cart = await cartsRepo.byUser(session.userId);
  if (!cart) {
    return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Cart not found' } }, { status: 404 });
  }
  const updated = await cartsRepo.removeItem(
    (cart as unknown as { _id: string })._id ?? (cart as unknown as { id: string }).id,
    id,
  );
  return NextResponse.json({ data: updated });
});
