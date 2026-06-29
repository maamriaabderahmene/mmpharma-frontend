import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { User, CreateUserInput, UpdateUserInput } from '@/lib/shared/types/User';
import { createUserSchema, updateUserSchema } from '@/lib/shared/schemas/user';
import UserModel from '@/lib/server/db/models/User';

interface UserFilter {
  role?: number;
  status?: string;
  q?: string;
  page?: number;
  limit?: number;
}

/**
 * List users with optional filtering and pagination.
 * @example
 * const result = await list({ role: 20, page: 1, limit: 10 });
 */
export async function list(filter: UserFilter = {}): Promise<{ data: User[]; total: number; page: number; limit: number; totalPages: number }> {
  await connectDB();
  const query: Record<string, unknown> = { deletedAt: null };
  if (filter.role !== undefined) query.role = filter.role;
  if (filter.status) query.status = filter.status;
  if (filter.q) query.name = { $regex: filter.q, $options: 'i' };

  const page = filter.page ?? 1;
  const limit = filter.limit ?? 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    UserModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
    UserModel.countDocuments(query).exec(),
  ]);

  return { data: data as unknown as User[], total, page, limit, totalPages: Math.ceil(total / limit) };
}

/**
 * Find a user by their unique identifier.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const user = await byId('64a...');
 */
export async function byId(id: string): Promise<User> {
  await connectDB();
  const user = await UserModel.findOne({ _id: id, deletedAt: null }).lean().exec();
  if (!user) throw new ApiError(404, 'NOT_FOUND', `User ${id} not found`);
  return user as unknown as User;
}

/**
 * Find a user by their email address.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const user = await byEmail('user@example.com');
 */
export async function byEmail(email: string): Promise<User> {
  await connectDB();
  const user = await UserModel.findOne({ email, deletedAt: null }).lean().exec();
  if (!user) throw new ApiError(404, 'NOT_FOUND', `User with email ${email} not found`);
  return user as unknown as User;
}

/**
 * Create a new user account.
 * @example
 * const user = await create({ email: 'user@example.com', name: 'John Doe', role: 20, ... });
 */
export async function create(input: CreateUserInput): Promise<User> {
  const parsed = createUserSchema.parse(input);
  await connectDB();
  const user = await UserModel.create(parsed);
  return user.toObject() as unknown as User;
}

/**
 * Update an existing user.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const user = await update('64a...', { name: 'Jane Doe' });
 */
export async function update(id: string, input: UpdateUserInput): Promise<User> {
  const parsed = updateUserSchema.parse(input);
  await connectDB();
  const user = await UserModel.findByIdAndUpdate(id, { $set: parsed }, { new: true }).exec();
  if (!user) throw new ApiError(404, 'NOT_FOUND', `User ${id} not found`);
  return user.toObject() as unknown as User;
}

/**
 * Soft-delete a user account.
 * @throws {ApiError} NOT_FOUND
 * @example
 * await softDelete('64a...');
 */
export async function softDelete(id: string): Promise<void> {
  await connectDB();
  const result = await UserModel.findByIdAndUpdate(id, { $set: { deletedAt: new Date().toISOString() } }).exec();
  if (!result) throw new ApiError(404, 'NOT_FOUND', `User ${id} not found`);
}

/**
 * Mark a user's email as verified.
 * @throws {ApiError} NOT_FOUND
 * @example
 * await verifyEmail('64a...');
 */
export async function verifyEmail(id: string): Promise<void> {
  await connectDB();
  const result = await UserModel.findByIdAndUpdate(id, {
    $set: { status: 'active', verifiedAt: new Date().toISOString() },
  }).exec();
  if (!result) throw new ApiError(404, 'NOT_FOUND', `User ${id} not found`);
}
