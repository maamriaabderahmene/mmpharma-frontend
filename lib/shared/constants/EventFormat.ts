/**
 * Event delivery formats.
 */
export const EventFormat = {
  /** Online / virtual event */
  ONLINE: 'online',
  /** In-person event */
  ONSITE: 'onsite',
  /** Hybrid online + onsite event */
  HYBRID: 'hybrid',
} as const;

export type EventFormat = (typeof EventFormat)[keyof typeof EventFormat];

export const EventFormatValues = Object.values(EventFormat) as readonly EventFormat[];
