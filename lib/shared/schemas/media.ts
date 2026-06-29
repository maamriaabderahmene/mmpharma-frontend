/**
 * Zod schema for MediaAsset objects.
 * Validates uploaded media files (images, documents, videos).
 */
import { z } from 'zod';

export const mediaAssetSchema = z.object({
  id: z.number().positive().int(),
  url: z.string().url(),
  filename: z.string().min(1).max(255),
  mimeType: z.string().min(1).max(100),
  size: z.number().int().nonnegative(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  alt: z.string().max(255).optional(),
  caption: z.string().max(500).optional(),
  uploadedById: z.number().positive().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).strict();

export type MediaAsset = z.infer<typeof mediaAssetSchema>;

export const createMediaAssetSchema = z.object({
  url: z.string().url(),
  filename: z.string().min(1).max(255),
  mimeType: z.string().min(1).max(100),
  size: z.number().int().nonnegative(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  alt: z.string().max(255).optional(),
  caption: z.string().max(500).optional(),
}).strict();

export type CreateMediaAsset = z.infer<typeof createMediaAssetSchema>;
