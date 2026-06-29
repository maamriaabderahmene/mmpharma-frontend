import type { ObjectId } from './ObjectId';
import type { CloudinaryAsset } from './MediaAsset';
import type { ArticleStatus } from '@/lib/shared/constants/ArticleStatus';

/**
 * Article author brief.
 */
export interface ArticleAuthor {
  /** Unique identifier of the author user */
  id: ObjectId;
  /** Display name of the author */
  name: string;
  /** Avatar image URL */
  avatar: string;
}

/**
 * Structured article body content.
 */
export interface ArticleBody {
  /** Raw markdown / MDX content */
  markdown: string;
  /** Total word count */
  wordCount: number;
  /** Estimated reading time in minutes */
  readingTime: number;
}

/**
 * Article entity for the blog / knowledge base.
 */
export interface Article {
  /** Unique identifier */
  id: ObjectId;
  /** Article title */
  title: string;
  /** URL-friendly slug */
  slug: string;
  /** Short summary or excerpt */
  excerpt: string;
  /** Structured body content */
  body: ArticleBody;
  /** Hero / cover image */
  heroImage: CloudinaryAsset;
  /** Article author */
  author: ArticleAuthor;
  /** Associated tags */
  tags: string[];
  /** ISO-8601 timestamp of publication */
  publishedAt?: string;
  /** Publication status */
  status: ArticleStatus;
  /** Total number of comments */
  commentCount: number;
  /** ISO-8601 timestamp of creation */
  createdAt: string;
  /** ISO-8601 timestamp of last update */
  updatedAt: string;
  /** ISO-8601 timestamp of soft-deletion */
  deletedAt?: string;
}

/**
 * Input for creating a new article.
 */
export type CreateArticleInput = Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

/**
 * Input for updating an existing article (all fields optional).
 */
export type UpdateArticleInput = Partial<CreateArticleInput>;
