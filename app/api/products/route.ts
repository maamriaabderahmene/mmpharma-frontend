import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireRole } from '@/lib/server/api/session';
import { UserRole } from '@/lib/shared/constants/UserRole';
import { ProductRangeValues } from '@/lib/shared/constants/ProductRange';
import type { ProductRange } from '@/lib/shared/constants/ProductRange';
import * as productsRepo from '@/lib/server/api/products.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const rawRange = searchParams.get('range');
  const range = rawRange && ProductRangeValues.includes(rawRange as ProductRange)
    ? (rawRange as ProductRange)
    : undefined;
  const filter = {
    q: searchParams.get('q') ?? undefined,
    range,
    scent: searchParams.get('scent') ?? undefined,
    conditionnement: searchParams.get('conditionnement') ?? undefined,
    haute: searchParams.has('haute') ? searchParams.get('haute') === 'true' : undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 20,
  };
  const result = await productsRepo.list(filter);
  return NextResponse.json({ data: result });
});

export const POST = withApi(async (req: NextRequest) => {
  requireRole(req, UserRole.ADMIN);
  const body = await req.json();
  const product = await productsRepo.create(body);
  return NextResponse.json({ data: product }, { status: 201 });
});
