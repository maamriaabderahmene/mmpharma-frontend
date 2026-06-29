import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireRole } from '@/lib/server/api/session';
import { UserRole } from '@/lib/shared/constants/UserRole';
import * as eventsRepo from '@/lib/server/api/events.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const filter = {
    status: searchParams.get('status') ?? undefined,
    format: searchParams.get('format') ?? undefined,
    tag: searchParams.get('tag') ?? undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 20,
  };
  const result = await eventsRepo.list(filter);
  return NextResponse.json({ data: result });
});

export const POST = withApi(async (req: NextRequest) => {
  requireRole(req, UserRole.ADMIN);
  const body = await req.json();
  const event = await eventsRepo.create(body);
  return NextResponse.json({ data: event }, { status: 201 });
});
