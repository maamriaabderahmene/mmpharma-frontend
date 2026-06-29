import { NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import * as productsRepo from '@/lib/server/api/products.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async () => {
  const facets = await productsRepo.facets();
  return NextResponse.json({ data: facets });
});
