import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import * as eventsRepo from '@/lib/server/api/events.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = withApi(async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  const session = requireAuth(req);
  const { slug } = await params;
  await eventsRepo.register(slug, session.userId);
  return NextResponse.json({ data: { message: 'Registered successfully' } });
});
