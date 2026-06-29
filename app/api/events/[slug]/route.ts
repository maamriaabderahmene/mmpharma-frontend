import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import * as eventsRepo from '@/lib/server/api/events.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const event = await eventsRepo.bySlug(slug);
  return NextResponse.json({ data: event });
});
