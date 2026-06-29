import { NextRequest, NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import * as commentsRepo from '@/lib/server/api/comments.repo';
import * as articlesRepo from '@/lib/server/api/articles.repo';
import * as usersRepo from '@/lib/server/api/users.repo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = withApi(async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const article = await articlesRepo.bySlug(slug);
  const { searchParams } = new URL(req.url);
  const filter = {
    status: searchParams.get('status') ?? undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 20,
  };
  const result = await commentsRepo.byArticle(article.id, filter);
  return NextResponse.json({ data: result });
});

export const POST = withApi(async (req: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  const session = requireAuth(req);
  const { slug } = await params;
  const article = await articlesRepo.bySlug(slug);
  const user = await usersRepo.byId(session.userId);
  const body = await req.json();
  const comment = await commentsRepo.create({
    ...body,
    articleId: article.id,
    author: { name: user.name, email: user.email },
  });
  return NextResponse.json({ data: comment }, { status: 201 });
});
