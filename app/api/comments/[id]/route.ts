import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth, requireRole } from '@/lib/server/api/session';
import { UserRole } from '@/lib/shared/constants/UserRole';
import * as commentsRepo from '@/lib/server/api/comments.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const PATCH = withApi(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const session = requireAuth(req);
  const { id } = await params;
  const comment = await commentsRepo.byId(id);
  if (comment.author.email !== session.email) {
    requireRole(req, UserRole.EDITOR, UserRole.ADMIN);
  }
  const body = await req.json();
  const updated = await commentsRepo.update(id, body);
  return NextResponse.json({ data: updated });
});

export const DELETE = withApi(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const session = requireAuth(req);
  const { id } = await params;
  const comment = await commentsRepo.byId(id);
  if (comment.author.email !== session.email) {
    requireRole(req, UserRole.EDITOR, UserRole.ADMIN);
  }
  await commentsRepo.softDelete(id);
  return NextResponse.json({ data: { message: 'Comment deleted successfully' } });
});
