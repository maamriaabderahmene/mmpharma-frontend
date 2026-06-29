/**
 * Zod schema for User objects.
 * Validates user registration, profile updates, and API responses.
 */
import { z } from 'zod';
import { UserRole, UserRoleValues } from '@/lib/shared/constants/UserRole';
import { UserStatus, UserStatusValues } from '@/lib/shared/constants/UserStatus';

export const userSchema = z.object({
  id: z.number().positive().int(),
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).max(100),
  role: z.number().refine((v) => (UserRoleValues as readonly number[]).includes(v), {
    message: 'Invalid user role',
  }),
  status: z.enum(UserStatusValues as unknown as [string, ...string[]]),
  createdAt: z.date(),
  updatedAt: z.date(),
}).strict();

export type User = z.infer<typeof userSchema>;

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(2).max(100),
  role: z.number().refine((v) => (UserRoleValues as readonly number[]).includes(v), {
    message: 'Invalid user role',
  }).default(UserRole.CUSTOMER),
}).strict();

export type CreateUser = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial().strict();

export type UpdateUser = z.infer<typeof updateUserSchema>;
