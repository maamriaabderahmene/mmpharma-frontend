import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { Comment, CreateCommentInput, UpdateCommentInput } from '@/lib/shared/types/Comment';
import { createCommentSchema } from '@/lib/shared/schemas/comment';
import CommentModel from '@/lib/server/db/models/Comment';

interface CommentFilter {
  status?: string;
  page?: number;
  limit?: number;
}

/**
 * List comments for a given article with pagination.
 * @example
 * const result = await byArticle('64a...', { page: 1, limit: 20 });
 */
export async function byArticle(articleId: string, filter: CommentFilter = {}): Promise<{ data: Comment[]; total: number; page: number; limit: number; totalPages: number }> {
  await connectDB();
  const query: Record<string, unknown> = { articleId, deletedAt: null };
  if (filter.status) query.status = filter.status;

  const page = filter.page ?? 1;
  const limit = filter.limit ?? 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    CommentModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
    CommentModel.countDocuments(query).exec(),
  ]);

  return { data: data as unknown as Comment[], total, page, limit, totalPages: Math.ceil(total / limit) };
}

/**
 * Find a comment by its unique identifier.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const comment = await byId('64a...');
 */
export async function byId(id: string): Promise<Comment> {
  await connectDB();
  const comment = await CommentModel.findOne({ _id: id, deletedAt: null }).lean().exec();
  if (!comment) throw new ApiError(404, 'NOT_FOUND', `Comment ${id} not found`);
  return comment as unknown as Comment;
}

/**
 * Create a new comment on an article.
 * @example
 * const comment = await create({ articleId: '64a...', body: 'Great article!', ... });
 */
export async function create(input: CreateCommentInput): Promise<Comment> {
  const parsed = createCommentSchema.parse(input);
  await connectDB();
  const comment = await CommentModel.create(parsed);
  return comment.toObject() as unknown as Comment;
}

/**
 * Update an existing comment.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const comment = await update('64a...', { body: 'Updated comment text' });
 */
export async function update(id: string, input: UpdateCommentInput): Promise<Comment> {
  await connectDB();
  const comment = await CommentModel.findByIdAndUpdate(id, { $set: input }, { new: true }).exec();
  if (!comment) throw new ApiError(404, 'NOT_FOUND', `Comment ${id} not found`);
  return comment.toObject() as unknown as Comment;
}

/**
 * Soft-delete a comment.
 * @throws {ApiError} NOT_FOUND
 * @example
 * await softDelete('64a...');
 */
export async function softDelete(id: string): Promise<void> {
  await connectDB();
  const result = await CommentModel.findByIdAndUpdate(id, { $set: { deletedAt: new Date().toISOString() } }).exec();
  if (!result) throw new ApiError(404, 'NOT_FOUND', `Comment ${id} not found`);
}

/**
 * Retrieve all comments made by a specific user.
 * @example
 * const comments = await byUser('64a...');
 */
export async function byUser(userId: string): Promise<Comment[]> {
  await connectDB();
  const comments = await CommentModel.find({ 'author.email': userId, deletedAt: null })
    .sort({ createdAt: -1 }).lean().exec();
  return comments as unknown as Comment[];
}
