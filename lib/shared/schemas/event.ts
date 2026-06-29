/**
 * Zod schemas for Event entities.
 * Validates calendar events, webinars, and industry meetups.
 */
import { z } from 'zod';

export const eventSchema = z.object({
  id: z.number().positive().int(),
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().min(1).max(5000),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().max(500).optional(),
  onlineUrl: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  maxAttendees: z.number().int().positive().optional(),
  published: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
}).strict();

export type Event = z.infer<typeof eventSchema>;

export const createEventSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().min(1).max(5000),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().max(500).optional(),
  onlineUrl: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  maxAttendees: z.number().int().positive().optional(),
  published: z.boolean().default(false),
}).strict().refine(
  (data) => data.endDate >= data.startDate,
  { message: 'End date must be after start date' },
);

export type CreateEvent = z.infer<typeof createEventSchema>;
