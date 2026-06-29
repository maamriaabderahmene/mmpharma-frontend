/**
 * Event schedule statuses.
 */
export const EventStatus = {
  /** Event is scheduled for a future date */
  UPCOMING: 'upcoming',
  /** Event is currently happening */
  LIVE: 'live',
  /** Event has already taken place */
  PAST: 'past',
  /** Event was cancelled */
  CANCELLED: 'cancelled',
} as const;

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

export const EventStatusValues = Object.values(EventStatus) as readonly EventStatus[];
