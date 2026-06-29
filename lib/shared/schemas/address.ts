/**
 * Zod schemas for Address entities.
 * Validates shipping and billing addresses.
 */
import { z } from 'zod';

export const addressSchema = z.object({
  id: z.number().positive().int(),
  userId: z.number().positive().int(),
  label: z.string().max(100).optional(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  company: z.string().max(255).optional(),
  line1: z.string().min(1).max(255),
  line2: z.string().max(255).optional(),
  city: z.string().min(1).max(100),
  state: z.string().max(100).optional(),
  postalCode: z.string().min(1).max(20),
  country: z.string().length(2, 'ISO 3166-1 alpha-2 country code'),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
}).strict();

export type Address = z.infer<typeof addressSchema>;

export const createAddressSchema = z.object({
  label: z.string().max(100).optional(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  company: z.string().max(255).optional(),
  line1: z.string().min(1).max(255),
  line2: z.string().max(255).optional(),
  city: z.string().min(1).max(100),
  state: z.string().max(100).optional(),
  postalCode: z.string().min(1).max(20),
  country: z.string().length(2, 'ISO 3166-1 alpha-2 country code'),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
}).strict();

export type CreateAddress = z.infer<typeof createAddressSchema>;

export const updateAddressSchema = createAddressSchema.partial().strict();

export type UpdateAddress = z.infer<typeof updateAddressSchema>;
