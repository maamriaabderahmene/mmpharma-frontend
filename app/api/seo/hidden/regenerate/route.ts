import { NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireRole } from '@/lib/server/api/session';
import { UserRole } from '@/lib/shared/constants/UserRole';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = withApi(async (req) => {
  requireRole(req, UserRole.ADMIN);
  return NextResponse.json({ data: { message: 'SEO regeneration initiated' } });
});
