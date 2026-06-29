/**
 * Zod schemas for Comment entities.
 * Validates user comments on articles and products.
 */
import { z } from 'zod';

export const commentSchema = z.object({
  id: z.number().positive().int(),
  content: z.string().min(1).max(2000),
  authorId: z.number().positive().int(),
  articleId: z.number().positive().int().optional(),
  productId: z.number().positive().int().optional(),
  parentId: z.number().positive().int().optional(),
  approved: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
}).strict();

export type Comment = z.infer<typeof commentSchema>;

export const createCommentSchema = z.object({
  content: z.string().min(1).max(2000),
  articleId: z.number().positive().int().optional(),
  productId: z.number().positive().int().optional(),
  parentId: z.number().positive().int().optional(),
}).strict().refine(
  (data) => data.articleId || data.productId,
  { message: 'Must be associated with either an article or a product' },
);

export type CreateComment = z.infer<typeof createCommentSchema>;
