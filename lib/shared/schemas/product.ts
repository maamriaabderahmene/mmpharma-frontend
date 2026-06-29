/**
 * Zod schemas for Product entities.
 * Handles full product, creation, updates, and filtering queries.
 */
import { z } from 'zod';
import {
  ProductCategory,
  ProductCategoryValues,
} from '@/lib/shared/constants/ProductCategory';
import {
  ProductRange,
  ProductRangeValues,
} from '@/lib/shared/constants/ProductRange';

export const productSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  shortDescription: z.string().max(500).optional(),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  category: z.enum(ProductCategoryValues as unknown as [string, ...string[]]),
  range: z.enum(ProductRangeValues as unknown as [string, ...string[]]),
  imageUrl: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
  stock: z.number().int().nonnegative().default(0),
  unit: z.string().min(1).max(50).optional(),
  conditionnements: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).strict();

export type Product = z.infer<typeof productSchema>;

export const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  shortDescription: z.string().max(500).optional(),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  category: z.enum(ProductCategoryValues as unknown as [string, ...string[]]),
  range: z.enum(ProductRangeValues as unknown as [string, ...string[]]),
  imageUrl: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
  stock: z.number().int().nonnegative().default(0),
  unit: z.string().min(1).max(50).optional(),
  conditionnements: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export type CreateProduct = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial().strict();

export type UpdateProduct = z.infer<typeof updateProductSchema>;

export const productFilterSchema = z.object({
  category: z.enum(ProductCategoryValues as unknown as [string, ...string[]]).optional(),
  range: z.enum(ProductRangeValues as unknown as [string, ...string[]]).optional(),
  isActive: z.boolean().optional(),
  featured: z.boolean().optional(),
  minPrice: z.number().nonnegative().optional(),
  maxPrice: z.number().nonnegative().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'price', 'createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
}).strict();

export type ProductFilter = z.infer<typeof productFilterSchema>;
