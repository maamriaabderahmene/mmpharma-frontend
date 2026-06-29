import type { ObjectId } from './ObjectId';
import type { CloudinaryAsset } from './MediaAsset';
import type { EventFormat } from '@/lib/shared/constants/EventFormat';
import type { EventStatus } from '@/lib/shared/constants/EventStatus';

/**
 * A single session within an event.
 */
export interface EventSession {
  /** Session title */
  title: string;
  /** Session start time (ISO-8601) */
  startTime: string;
  /** Session end time (ISO-8601) */
  endTime: string;
  /** Speaker or presenter name */
  speaker: string;
  /** Session description */
  description: string;
}

/**
 * Physical event location.
 */
export interface EventLocation {
  /** Venue or location name */
  name: string;
  /** Street address */
  address: string;
  /** City */
  city: string;
  /** Country */
  country: string;
}

/**
 * Event entity for webinars, workshops, and conferences.
 */
export interface Event {
  /** Unique identifier */
  id: ObjectId;
  /** Event title */
  title: string;
  /** URL-friendly slug */
  slug: string;
  /** Event description */
  description: string;
  /** Event format type */
  format: EventFormat;
  /** Event lifecycle status */
  status: EventStatus;
  /** Event start date (ISO-8601) */
  startDate: string;
  /** Event end date (ISO-8601) */
  endDate: string;
  /** Physical location details */
  location?: EventLocation;
  /** Hero / cover image */
  heroImage?: CloudinaryAsset;
  /** List of sessions */
  sessions: EventSession[];
  /** Maximum attendee capacity */
  capacity?: number;
  /** Current registration count */
  registrations: number;
  /** Associated tags */
  tags: string[];
  /** ISO-8601 timestamp of creation */
  createdAt: string;
  /** ISO-8601 timestamp of last update */
  updatedAt: string;
  /** ISO-8601 timestamp of soft-deletion */
  deletedAt?: string;
}

/**
 * Input for creating a new event.
 */
export type CreateEventInput = Omit<Event, 'id' | 'registrations' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

/**
 * Input for updating an existing event (all fields optional).
 */
export type UpdateEventInput = Partial<CreateEventInput>;
