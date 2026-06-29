import 'server-only';
import { ApiError } from '@/lib/shared/utils/ApiError';
import { UserRole } from '@/lib/shared/constants/UserRole';
import type { Event, CreateEventInput } from '@/lib/shared/types/Event';
import type { SessionPayload } from '@/lib/shared/types/Session';
import { createEventSchema } from '@/lib/shared/schemas/event';
import * as eventsRepo from './events.repo';
import { create as createAuditLog } from './audit.repo';

interface EventFilter {
  status?: string;
  format?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export async function list(filter: EventFilter = {}): Promise<{
  data: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  return eventsRepo.list(filter);
}

export async function getBySlug(slug: string): Promise<Event> {
  return eventsRepo.bySlug(slug);
}

export async function create(input: CreateEventInput, session: SessionPayload): Promise<Event> {
  if (session.role < UserRole.ADMIN) {
    throw new ApiError(403, 'FORBIDDEN', 'Only admins can create events');
  }

  createEventSchema.parse(input);

  const event = await eventsRepo.create(input);

  await createAuditLog({
    userId: session.userId,
    action: 'create_event',
    resource: 'event',
    resourceId: event.id,
    ip: '',
    userAgent: '',
  });

  return event;
}

export async function register(eventId: string, userId: string): Promise<void> {
  const event = await eventsRepo.byId(eventId);

  if (event.capacity !== undefined && event.registrations >= event.capacity) {
    throw new ApiError(409, 'CONFLICT', 'Event is at full capacity');
  }

  await eventsRepo.register(eventId, userId);
}

export async function next(locale = 'fr-MA'): Promise<Event[]> {
  return eventsRepo.next(locale);
}
