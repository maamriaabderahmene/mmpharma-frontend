/**
 * Zod schemas for Article entities.
 * Validates blog posts, guides, and editorial content.
 */
import { z } from 'zod';

export const articleSchema = z.object({
  id: z.number().positive().int(),
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1),
  coverImage: z.string().url().optional(),
  authorId: z.number().positive().int(),
  published: z.boolean().default(false),
  publishedAt: z.date().optional(),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).strict();

export type Article = z.infer<typeof articleSchema>;

export const createArticleSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1),
  coverImage: z.string().url().optional(),
  authorId: z.number().positive().int(),
  published: z.boolean().default(false),
  publishedAt: z.date().optional(),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
}).strict();

export type CreateArticle = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = createArticleSchema.partial().strict();

export type UpdateArticle = z.infer<typeof updateArticleSchema>;
