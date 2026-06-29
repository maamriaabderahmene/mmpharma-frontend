import 'server-only';
import crypto from 'crypto';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import {
  signUpSchema,
  signInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '@/lib/shared/schemas/auth';
import * as usersRepo from '@/lib/server/api/users.repo';
import UserModel from '@/lib/server/db/models/User';
import type { SessionPayload } from '@/lib/shared/types/Session';
import { UserRole } from '@/lib/shared/constants/UserRole';

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(':');
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const verify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verify;
}

export async function signUp(input: unknown): Promise<{ user: Record<string, unknown>; session: SessionPayload }> {
  const parsed = signUpSchema.parse(input);
  await connectDB();

  const existing = await UserModel.findOne({ email: parsed.email }).exec();
  if (existing) {
    throw new ApiError(409, 'CONFLICT', 'An account with this email already exists');
  }

  const passwordHash = hashPassword(parsed.password);
  const user = await UserModel.create({
    email: parsed.email,
    name: parsed.name,
    passwordHash,
    role: UserRole.CUSTOMER,
    status: 'pending-verification',
  });

  const session: SessionPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  return {
    user: { id: user._id.toString(), email: user.email, name: user.name, role: user.role },
    session,
  };
}

export async function signIn(input: unknown): Promise<{ user: Record<string, unknown>; session: SessionPayload }> {
  const parsed = signInSchema.parse(input);
  await connectDB();

  const user = await UserModel.findOne({ email: parsed.email }).exec();
  if (!user) {
    throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const storedHash = user.get('passwordHash') as string | undefined;
  if (!storedHash || !verifyPassword(parsed.password, storedHash)) {
    throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const session: SessionPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  return {
    user: { id: user._id.toString(), email: user.email, name: user.name, role: user.role },
    session,
  };
}

export async function signOut(): Promise<void> {
  return;
}

export async function forgotPassword(input: unknown): Promise<void> {
  const parsed = forgotPasswordSchema.parse(input);
  await connectDB();

  const user = await UserModel.findOne({ email: parsed.email }).exec();
  if (!user) {
    return;
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpires = new Date(Date.now() + 60 * 60 * 1000);
  await UserModel.findByIdAndUpdate(user._id, {
    $set: { resetToken, resetExpires },
  }).exec();
}

export async function resetPassword(input: unknown): Promise<void> {
  const parsed = resetPasswordSchema.parse(input);
  await connectDB();

  const user = await UserModel.findOne({
    resetToken: parsed.token,
    resetExpires: { $gt: new Date() },
  }).exec();

  if (!user) {
    throw new ApiError(400, 'INVALID_TOKEN', 'Reset token is invalid or has expired');
  }

  const passwordHash = hashPassword(parsed.password);
  await UserModel.findByIdAndUpdate(user._id, {
    $set: { passwordHash },
    $unset: { resetToken: '', resetExpires: '' },
  }).exec();
}

export async function verifyEmail(token: string): Promise<void> {
  await connectDB();

  const user = await UserModel.findOne({ emailVerificationToken: token }).exec();
  if (!user) {
    throw new ApiError(400, 'INVALID_TOKEN', 'Verification token is invalid');
  }

  await UserModel.findByIdAndUpdate(user._id, {
    $set: { status: 'active' },
    $unset: { emailVerificationToken: '' },
  }).exec();
}
