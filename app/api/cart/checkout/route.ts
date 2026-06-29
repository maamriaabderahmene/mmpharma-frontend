import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import * as cartsRepo from '@/lib/server/api/carts.repo';
import * as ordersRepo from '@/lib/server/api/orders.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = withApi(async (req: NextRequest) => {
  const session = requireAuth(req);
  const cart = await cartsRepo.byUser(session.userId);
  if (!cart || !cart.items?.length) {
    return NextResponse.json({ error: { code: 'BAD_REQUEST', message: 'Cart is empty' } }, { status: 400 });
  }
  const order = await ordersRepo.create({ userId: session.userId, items: cart.items, ...(await req.json()) });
  await cartsRepo.clear((cart as unknown as { _id: string })._id ?? (cart as unknown as { id: string }).id);
  return NextResponse.json({ data: order }, { status: 201 });
});
