import type { ObjectId } from './ObjectId';
import type { CommentStatus } from '@/lib/shared/constants/CommentStatus';

/**
 * A reaction (like / vote) on a comment.
 */
export interface CommentReaction {
  /** Reaction type (e.g. like, thumbs-up) */
  type: string;
  /** User who performed the reaction */
  userId: ObjectId;
}

/**
 * Comment entity attached to an article.
 */
export interface Comment {
  /** Unique identifier */
  id: ObjectId;
  /** Article this comment belongs to */
  articleId: ObjectId;
  /** Parent comment ID for threaded replies */
  parentId?: ObjectId;
  /** Comment author information */
  author: {
    /** Author display name */
    name: string;
    /** Author email address */
    email: string;
    /** Author avatar URL */
    avatar?: string;
  };
  /** Comment body text */
  body: string;
  /** Moderation status */
  status: CommentStatus;
  /** User reactions on this comment */
  reactions: CommentReaction[];
  /** Nesting depth (0 for top-level) */
  depth: number;
  /** ISO-8601 timestamp of creation */
  createdAt: string;
  /** ISO-8601 timestamp of last update */
  updatedAt: string;
  /** ISO-8601 timestamp of soft-deletion */
  deletedAt?: string;
}

/**
 * Input for creating a new comment.
 */
export type CreateCommentInput = Omit<Comment, 'id' | 'reactions' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

/**
 * Input for updating an existing comment (all fields optional).
 */
export type UpdateCommentInput = Partial<CreateCommentInput>;
