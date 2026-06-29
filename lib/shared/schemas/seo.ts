/**
 * Zod schema for SEO entries.
 * Validates per-page SEO metadata (title, description, Open Graph).
 */
import { z } from 'zod';

export const seoEntrySchema = z.object({
  id: z.number().positive().int(),
  path: z.string().min(1).max(500),
  title: z.string().max(70).optional(),
  description: z.string().max(160).optional(),
  ogTitle: z.string().max(70).optional(),
  ogDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional(),
  noindex: z.boolean().default(false),
  nofollow: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
}).strict();

export type SeoEntry = z.infer<typeof seoEntrySchema>;

export const createSeoEntrySchema = z.object({
  path: z.string().min(1).max(500),
  title: z.string().max(70).optional(),
  description: z.string().max(160).optional(),
  ogTitle: z.string().max(70).optional(),
  ogDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional(),
  noindex: z.boolean().default(false),
  nofollow: z.boolean().default(false),
}).strict();

export type CreateSeoEntry = z.infer<typeof createSeoEntrySchema>;

export const updateSeoEntrySchema = createSeoEntrySchema.partial().strict();

export type UpdateSeoEntry = z.infer<typeof updateSeoEntrySchema>;
