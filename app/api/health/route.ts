import { NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async () => {
  return NextResponse.json({
    data: { status: 'ok', version: '1.0.0', uptime: process.uptime() },
  });
});
