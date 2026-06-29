import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { Article, CreateArticleInput, UpdateArticleInput } from '@/lib/shared/types/Article';
import { createArticleSchema, updateArticleSchema } from '@/lib/shared/schemas/article';
import ArticleModel from '@/lib/server/db/models/Article';

interface ArticleFilter {
  status?: string;
  tag?: string;
  q?: string;
  page?: number;
  limit?: number;
}

/**
 * List articles with optional filtering and pagination.
 * @example
 * const result = await list({ status: 'published', page: 1, limit: 10 });
 */
export async function list(filter: ArticleFilter = {}): Promise<{ data: Article[]; total: number; page: number; limit: number; totalPages: number }> {
  await connectDB();
  const query: Record<string, unknown> = { deletedAt: null };
  if (filter.status) query.status = filter.status;
  if (filter.tag) query.tags = filter.tag;
  if (filter.q) query.title = { $regex: filter.q, $options: 'i' };

  const page = filter.page ?? 1;
  const limit = filter.limit ?? 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    ArticleModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
    ArticleModel.countDocuments(query).exec(),
  ]);

  return { data: data as unknown as Article[], total, page, limit, totalPages: Math.ceil(total / limit) };
}

/**
 * Find an article by its URL slug.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const article = await bySlug('comment-choisir-son-savon');
 */
export async function bySlug(slug: string): Promise<Article> {
  await connectDB();
  const article = await ArticleModel.findOne({ slug, deletedAt: null }).lean().exec();
  if (!article) throw new ApiError(404, 'NOT_FOUND', `Article with slug ${slug} not found`);
  return article as unknown as Article;
}

/**
 * Find an article by its unique identifier.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const article = await byId('64a...');
 */
export async function byId(id: string): Promise<Article> {
  await connectDB();
  const article = await ArticleModel.findOne({ _id: id, deletedAt: null }).lean().exec();
  if (!article) throw new ApiError(404, 'NOT_FOUND', `Article ${id} not found`);
  return article as unknown as Article;
}

/**
 * Create a new article.
 * @example
 * const article = await create({ title: 'New Article', slug: 'new-article', ... });
 */
export async function create(input: CreateArticleInput): Promise<Article> {
  const parsed = createArticleSchema.parse(input);
  await connectDB();
  const article = await ArticleModel.create(parsed);
  return article.toObject() as unknown as Article;
}

/**
 * Update an existing article.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const article = await update('64a...', { title: 'Updated Title' });
 */
export async function update(id: string, input: UpdateArticleInput): Promise<Article> {
  const parsed = updateArticleSchema.parse(input);
  await connectDB();
  const article = await ArticleModel.findByIdAndUpdate(id, { $set: parsed }, { new: true }).exec();
  if (!article) throw new ApiError(404, 'NOT_FOUND', `Article ${id} not found`);
  return article.toObject() as unknown as Article;
}

/**
 * Soft-delete an article.
 * @throws {ApiError} NOT_FOUND
 * @example
 * await softDelete('64a...');
 */
export async function softDelete(id: string): Promise<void> {
  await connectDB();
  const result = await ArticleModel.findByIdAndUpdate(id, { $set: { deletedAt: new Date().toISOString() } }).exec();
  if (!result) throw new ApiError(404, 'NOT_FOUND', `Article ${id} not found`);
}

/**
 * Retrieve the latest published articles.
 * @example
 * const articles = await latest(5, 'fr-MA');
 */
export async function latest(limit: number, _locale: string): Promise<Article[]> {
  await connectDB();
  const articles = await ArticleModel.find({ status: 'published', deletedAt: null })
    .sort({ publishedAt: -1 }).limit(limit).lean().exec();
  return articles as unknown as Article[];
}

/**
 * Retrieve articles authored by a specific user.
 * @example
 * const articles = await byAuthor('64a...');
 */
export async function byAuthor(userId: string): Promise<Article[]> {
  await connectDB();
  const articles = await ArticleModel.find({ 'author.id': userId, deletedAt: null })
    .sort({ createdAt: -1 }).lean().exec();
  return articles as unknown as Article[];
}
