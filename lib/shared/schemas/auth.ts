/**
 * Zod schemas for authentication payloads.
 * Validates sign-up, sign-in, forgot-password, and reset-password forms.
 */
import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128),
  name: z.string().min(2).max(100),
}).strict().refine(
  (data) => data.password === data.confirmPassword,
  { message: 'Passwords must match', path: ['confirmPassword'] },
);

export type SignUp = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
}).strict();

export type SignIn = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
}).strict();

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128),
}).strict().refine(
  (data) => data.password === data.confirmPassword,
  { message: 'Passwords must match', path: ['confirmPassword'] },
);

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
