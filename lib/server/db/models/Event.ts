import 'server-only';
import mongoose, { Schema, Document } from 'mongoose';
import { EventFormat, EventFormatValues } from '@/lib/shared/constants/EventFormat';
import { EventStatus, EventStatusValues } from '@/lib/shared/constants/EventStatus';
import type { EventSession, EventLocation, CloudinaryAsset } from '@/lib/shared/types/Event';

export interface EventDocument extends Document {
  title: string;
  slug: string;
  description: string;
  format: string;
  status: string;
  startDate: Date;
  endDate: Date;
  location?: EventLocation;
  heroImage?: CloudinaryAsset;
  sessions: EventSession[];
  capacity?: number;
  registrations: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const eventSessionSchema = new Schema<EventSession>(
  {
    title: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    speaker: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const eventLocationSchema = new Schema<EventLocation>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const cloudinaryAssetSchema = new Schema<CloudinaryAsset>(
  {
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    secureUrl: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    format: { type: String, required: true },
    bytes: { type: Number, required: true },
  },
  { _id: false }
);

const eventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    format: { type: String, required: true, enum: EventFormatValues },
    status: { type: String, required: true, default: EventStatus.UPCOMING, enum: EventStatusValues },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: eventLocationSchema },
    heroImage: { type: cloudinaryAssetSchema },
    sessions: { type: [eventSessionSchema], default: [] },
    capacity: { type: Number },
    registrations: { type: Number, required: true, default: 0 },
    tags: { type: [String], default: [] },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

eventSchema.index({ status: 1, startDate: 1 });
eventSchema.index({ format: 1 });
eventSchema.index({ deletedAt: 1 });

const Event = mongoose.models.Event ?? mongoose.model<EventDocument>('Event', eventSchema);

export default Event;
