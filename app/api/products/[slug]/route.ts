import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import * as productsRepo from '@/lib/server/api/products.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await productsRepo.bySlug(slug);
  if (!product) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: `Product with slug ${slug} not found` } },
      { status: 404 },
    );
  }
  return NextResponse.json({ data: product });
});
