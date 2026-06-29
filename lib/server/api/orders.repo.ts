import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { Order, CreateOrderInput, UpdateOrderInput } from '@/lib/shared/types/Order';
import { createOrderSchema } from '@/lib/shared/schemas/order';
import OrderModel from '@/lib/server/db/models/Order';

interface OrderFilter {
  status?: string;
  page?: number;
  limit?: number;
}

/**
 * List orders for a specific user with optional filtering.
 * @example
 * const result = await list('64a...', { page: 1, limit: 10 });
 */
export async function list(userId: string, filter: OrderFilter = {}): Promise<{ data: Order[]; total: number; page: number; limit: number; totalPages: number }> {
  await connectDB();
  const query: Record<string, unknown> = { userId, deletedAt: null };
  if (filter.status) query.status = filter.status;

  const page = filter.page ?? 1;
  const limit = filter.limit ?? 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    OrderModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
    OrderModel.countDocuments(query).exec(),
  ]);

  return { data: data as unknown as Order[], total, page, limit, totalPages: Math.ceil(total / limit) };
}

/**
 * Find an order by its unique identifier, optionally scoped to a user.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const order = await byId('64a...');
 * const order = await byId('64a...', '64b...');
 */
export async function byId(id: string, userId?: string): Promise<Order> {
  await connectDB();
  const query: Record<string, unknown> = { _id: id, deletedAt: null };
  if (userId) query.userId = userId;

  const order = await OrderModel.findOne(query).lean().exec();
  if (!order) throw new ApiError(404, 'NOT_FOUND', `Order ${id} not found`);
  return order as unknown as Order;
}

/**
 * Create a new order.
 * @example
 * const order = await create({ userId: '64a...', items: [...], ... });
 */
export async function create(input: CreateOrderInput): Promise<Order> {
  const parsed = createOrderSchema.parse(input);
  await connectDB();
  const order = await OrderModel.create(parsed);
  return order.toObject() as unknown as Order;
}

/**
 * Update an existing order.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const order = await update('64a...', { status: 'shipped' });
 */
export async function update(id: string, input: UpdateOrderInput): Promise<Order> {
  await connectDB();
  const updateData: Record<string, unknown> = {};
  if (input.status) updateData.status = input.status;
  if (input.notes) updateData.notes = input.notes;

  if (input.status) {
    updateData.$push = { timeline: { status: input.status, timestamp: new Date().toISOString() } };
  }

  const order = await OrderModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
  if (!order) throw new ApiError(404, 'NOT_FOUND', `Order ${id} not found`);
  return order.toObject() as unknown as Order;
}

/**
 * Retrieve all orders placed by a specific user.
 * @example
 * const orders = await byUser('64a...');
 */
export async function byUser(userId: string): Promise<Order[]> {
  await connectDB();
  const orders = await OrderModel.find({ userId, deletedAt: null }).sort({ createdAt: -1 }).lean().exec();
  return orders as unknown as Order[];
}
