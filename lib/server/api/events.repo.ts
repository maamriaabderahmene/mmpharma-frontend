import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { Event, CreateEventInput, UpdateEventInput } from '@/lib/shared/types/Event';
import { createEventSchema } from '@/lib/shared/schemas/event';
import EventModel from '@/lib/server/db/models/Event';

interface EventFilter {
  status?: string;
  format?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

/**
 * List events with optional filtering and pagination.
 * @example
 * const result = await list({ status: 'upcoming', page: 1, limit: 10 });
 */
export async function list(filter: EventFilter = {}): Promise<{ data: Event[]; total: number; page: number; limit: number; totalPages: number }> {
  await connectDB();
  const query: Record<string, unknown> = { deletedAt: null };
  if (filter.status) query.status = filter.status;
  if (filter.format) query.format = filter.format;
  if (filter.tag) query.tags = filter.tag;

  const page = filter.page ?? 1;
  const limit = filter.limit ?? 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    EventModel.find(query).sort({ startDate: 1 }).skip(skip).limit(limit).lean().exec(),
    EventModel.countDocuments(query).exec(),
  ]);

  return { data: data as unknown as Event[], total, page, limit, totalPages: Math.ceil(total / limit) };
}

/**
 * Find an event by its URL slug.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const event = await bySlug('webinaire-ingredients-naturels');
 */
export async function bySlug(slug: string): Promise<Event> {
  await connectDB();
  const event = await EventModel.findOne({ slug, deletedAt: null }).lean().exec();
  if (!event) throw new ApiError(404, 'NOT_FOUND', `Event with slug ${slug} not found`);
  return event as unknown as Event;
}

/**
 * Find an event by its unique identifier.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const event = await byId('64a...');
 */
export async function byId(id: string): Promise<Event> {
  await connectDB();
  const event = await EventModel.findOne({ _id: id, deletedAt: null }).lean().exec();
  if (!event) throw new ApiError(404, 'NOT_FOUND', `Event ${id} not found`);
  return event as unknown as Event;
}

/**
 * Create a new event.
 * @example
 * const event = await create({ title: 'Webinaire', slug: 'webinaire', ... });
 */
export async function create(input: CreateEventInput): Promise<Event> {
  const parsed = createEventSchema.parse(input);
  await connectDB();
  const event = await EventModel.create(parsed);
  return event.toObject() as unknown as Event;
}

/**
 * Update an existing event.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const event = await update('64a...', { title: 'Updated Title' });
 */
export async function update(id: string, input: UpdateEventInput): Promise<Event> {
  await connectDB();
  const event = await EventModel.findByIdAndUpdate(id, { $set: input }, { new: true }).exec();
  if (!event) throw new ApiError(404, 'NOT_FOUND', `Event ${id} not found`);
  return event.toObject() as unknown as Event;
}

/**
 * Soft-delete an event.
 * @throws {ApiError} NOT_FOUND
 * @example
 * await softDelete('64a...');
 */
export async function softDelete(id: string): Promise<void> {
  await connectDB();
  const result = await EventModel.findByIdAndUpdate(id, { $set: { deletedAt: new Date().toISOString() } }).exec();
  if (!result) throw new ApiError(404, 'NOT_FOUND', `Event ${id} not found`);
}

/**
 * Retrieve upcoming events for a given locale.
 * @example
 * const events = await next('fr-MA');
 */
export async function next(_locale: string): Promise<Event[]> {
  await connectDB();
  const events = await EventModel.find({
    status: 'upcoming',
    startDate: { $gte: new Date().toISOString() },
    deletedAt: null,
  }).sort({ startDate: 1 }).lean().exec();
  return events as unknown as Event[];
}

/**
 * Register a user for an event.
 * @throws {ApiError} NOT_FOUND
 * @throws {ApiError} CONFLICT
 * @example
 * await register('64a...', '64b...');
 */
export async function register(eventId: string, userId: string): Promise<void> {
  await connectDB();
  const event = await EventModel.findById(eventId).exec();
  if (!event) throw new ApiError(404, 'NOT_FOUND', `Event ${eventId} not found`);

  const registrations = event.get('registrations') ?? 0;
  const capacity = event.get('capacity');

  if (capacity !== undefined && registrations >= capacity) {
    throw new ApiError(409, 'CONFLICT', 'Event is at full capacity');
  }

  await EventModel.findByIdAndUpdate(eventId, {
    $inc: { registrations: 1 },
    $push: { registeredUsers: userId },
  }).exec();
}
