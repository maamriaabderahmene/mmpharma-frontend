import 'server-only';
import { ApiError } from '@/lib/shared/utils/ApiError';
import { UserRole } from '@/lib/shared/constants/UserRole';
import type { Article, CreateArticleInput, UpdateArticleInput } from '@/lib/shared/types/Article';
import type { SessionPayload } from '@/lib/shared/types/Session';
import { createArticleSchema, updateArticleSchema } from '@/lib/shared/schemas/article';
import * as articlesRepo from './articles.repo';
import * as commentsRepo from './comments.repo';
import { create as createAuditLog } from './audit.repo';

interface ArticleFilter {
  status?: string;
  tag?: string;
  q?: string;
  page?: number;
  limit?: number;
}

export async function list(filter: ArticleFilter = {}): Promise<{
  data: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  return articlesRepo.list(filter);
}

export async function getBySlug(slug: string): Promise<Article & { commentsCount: number }> {
  const article = await articlesRepo.bySlug(slug);

  const commentsResult = await commentsRepo.byArticle(article.id, { limit: 1 });
  const commentsCount = commentsResult.total;

  return { ...article, commentsCount };
}

export async function create(input: CreateArticleInput, authorId: string): Promise<Article> {
  const parsed = createArticleSchema.parse(input);

  const article = await articlesRepo.create({
    ...parsed,
    author: {
      id: authorId,
      name: '',
      avatar: '',
    },
    heroImage: parsed.heroImage ?? { publicId: '', url: '', secureUrl: '', width: 0, height: 0, format: '', bytes: 0 },
    body: parsed.body ?? { markdown: '', wordCount: 0, readingTime: 0 },
    commentCount: 0,
    status: 'draft' as const,
  } as CreateArticleInput);

  return article;
}

export async function update(id: string, input: UpdateArticleInput): Promise<Article> {
  const parsed = updateArticleSchema.parse(input);
  return articlesRepo.update(id, parsed as UpdateArticleInput);
}

export async function publish(id: string, session: SessionPayload): Promise<Article> {
  if (session.role < UserRole.EDITOR) {
    throw new ApiError(403, 'FORBIDDEN', 'Only editors can publish articles');
  }

  const article = await articlesRepo.update(id, {
    status: 'published' as const,
    publishedAt: new Date().toISOString(),
  } as UpdateArticleInput);

  return article;
}

export async function softDelete(id: string, session: SessionPayload): Promise<void> {
  if (session.role < UserRole.EDITOR) {
    throw new ApiError(403, 'FORBIDDEN', 'Only editors can delete articles');
  }

  await articlesRepo.softDelete(id);

  await createAuditLog({
    userId: session.userId,
    action: 'delete_article',
    resource: 'article',
    resourceId: id,
    ip: '',
    userAgent: '',
  });
}

export async function latest(limit = 5, locale = 'fr-MA'): Promise<Article[]> {
  return articlesRepo.latest(limit, locale);
}

export async function myArticles(userId: string): Promise<Article[]> {
  return articlesRepo.byAuthor(userId);
}
