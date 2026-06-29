import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import type { AuditLog, CreateAuditLogInput } from '@/lib/shared/types/AuditLog';
import AuditLogModel from '@/lib/server/db/models/AuditLog';

interface AuditFilter {
  action?: string;
  resource?: string;
  userId?: string;
  page?: number;
  limit?: number;
}

/**
 * List audit log entries with optional filtering and pagination.
 * @example
 * const result = await list({ action: 'delete', page: 1, limit: 50 });
 */
export async function list(filter: AuditFilter = {}): Promise<{ data: AuditLog[]; total: number; page: number; limit: number; totalPages: number }> {
  await connectDB();
  const query: Record<string, unknown> = {};
  if (filter.action) query.action = filter.action;
  if (filter.resource) query.resource = filter.resource;
  if (filter.userId) query.userId = filter.userId;

  const page = filter.page ?? 1;
  const limit = filter.limit ?? 50;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    AuditLogModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
    AuditLogModel.countDocuments(query).exec(),
  ]);

  return { data: data as unknown as AuditLog[], total, page, limit, totalPages: Math.ceil(total / limit) };
}

/**
 * Create a new audit log entry.
 * @example
 * await create({ userId: '64a...', action: 'delete', resource: 'product', resourceId: '64b...', ip: '127.0.0.1', userAgent: 'Mozilla/5.0' });
 */
export async function create(input: CreateAuditLogInput): Promise<AuditLog> {
  await connectDB();
  const entry = await AuditLogModel.create(input);
  return entry.toObject() as unknown as AuditLog;
}

/**
 * Retrieve all audit log entries for a specific user.
 * @example
 * const logs = await byUser('64a...');
 */
export async function byUser(userId: string): Promise<AuditLog[]> {
  await connectDB();
  const logs = await AuditLogModel.find({ userId }).sort({ createdAt: -1 }).lean().exec();
  return logs as unknown as AuditLog[];
}
