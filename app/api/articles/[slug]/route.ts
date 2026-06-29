import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireRole } from '@/lib/server/api/session';
import { UserRole } from '@/lib/shared/constants/UserRole';
import * as articlesRepo from '@/lib/server/api/articles.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const article = await articlesRepo.bySlug(slug);
  return NextResponse.json({ data: article });
});

export const PATCH = withApi(async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  requireRole(req, UserRole.EDITOR, UserRole.ADMIN);
  const { slug } = await params;
  const body = await req.json();
  const article = await articlesRepo.update(slug, body);
  return NextResponse.json({ data: article });
});

export const DELETE = withApi(async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  requireRole(req, UserRole.EDITOR, UserRole.ADMIN);
  const { slug } = await params;
  await articlesRepo.softDelete(slug);
  return NextResponse.json({ data: { message: 'Article deleted successfully' } });
});
