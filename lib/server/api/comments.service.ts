import 'server-only';
import { ApiError } from '@/lib/shared/utils/ApiError';
import { UserRole } from '@/lib/shared/constants/UserRole';
import { CommentStatus } from '@/lib/shared/constants/CommentStatus';
import type { Comment, CreateCommentInput, UpdateCommentInput } from '@/lib/shared/types/Comment';
import type { SessionPayload } from '@/lib/shared/types/Session';
import type { User } from '@/lib/shared/types/User';
import { createCommentSchema } from '@/lib/shared/schemas/comment';
import * as commentsRepo from './comments.repo';
import * as usersRepo from './users.repo';
import { create as createAuditLog } from './audit.repo';

interface CommentFilter {
  status?: string;
  page?: number;
  limit?: number;
}

export async function byArticle(articleId: string, filter: CommentFilter = {}): Promise<{
  data: Comment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  return commentsRepo.byArticle(articleId, filter);
}

export async function post(input: CreateCommentInput, userId: string): Promise<Comment> {
  const parsed = createCommentSchema.parse(input);

  const user = await usersRepo.byId(userId);

  const existingComments = await commentsRepo.byUser(userId);
  const hasApproved = existingComments.some((c) => c.status === CommentStatus.APPROVED);
  const status = hasApproved ? CommentStatus.APPROVED : CommentStatus.PENDING;

  const comment = await commentsRepo.create({
    ...parsed,
    articleId: parsed.articleId ?? '',
    author: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    status,
    depth: 0,
  } as CreateCommentInput);

  await createAuditLog({
    userId,
    action: 'post_comment',
    resource: 'comment',
    resourceId: comment.id,
    ip: '',
    userAgent: '',
  });

  return comment;
}

export async function update(id: string, input: UpdateCommentInput, userId: string): Promise<Comment> {
  const existing = await commentsRepo.byId(id);

  if (existing.author.email !== userId) {
    throw new ApiError(403, 'FORBIDDEN', 'You can only edit your own comments');
  }

  return commentsRepo.update(id, input);
}

export async function softDelete(id: string, userId: string, session: SessionPayload): Promise<void> {
  const existing = await commentsRepo.byId(id);

  const isOwner = existing.author.email === userId;
  const isEditor = session.role >= UserRole.EDITOR;

  if (!isOwner && !isEditor) {
    throw new ApiError(403, 'FORBIDDEN', 'Not authorized to delete this comment');
  }

  await commentsRepo.softDelete(id);

  await createAuditLog({
    userId,
    action: 'delete_comment',
    resource: 'comment',
    resourceId: id,
    ip: '',
    userAgent: '',
  });
}
