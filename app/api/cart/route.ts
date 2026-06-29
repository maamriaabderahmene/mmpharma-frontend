import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import * as cartsRepo from '@/lib/server/api/carts.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (req: NextRequest) => {
  const session = requireAuth(req);
  let cart = await cartsRepo.byUser(session.userId);
  if (!cart) {
    const items: unknown[] = [];
    cart = await cartsRepo.upsert(session.userId, items as never);
  }
  return NextResponse.json({ data: cart });
});

export const POST = withApi(async (req: NextRequest) => {
  const session = requireAuth(req);
  let cart = await cartsRepo.byUser(session.userId);
  if (!cart) {
    cart = await cartsRepo.upsert(session.userId, []);
  }
  const body = await req.json();
  const updated = await cartsRepo.addItem((cart as unknown as { _id: string })._id ?? (cart as unknown as { id: string }).id, body);
  return NextResponse.json({ data: updated });
});

export const DELETE = withApi(async (req: NextRequest) => {
  const session = requireAuth(req);
  const cart = await cartsRepo.byUser(session.userId);
  if (!cart) {
    return NextResponse.json({ data: { message: 'Cart is already empty' } });
  }
  await cartsRepo.clear((cart as unknown as { _id: string })._id ?? (cart as unknown as { id: string }).id);
  return NextResponse.json({ data: { message: 'Cart cleared successfully' } });
});
