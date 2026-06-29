import 'server-only';
import mongoose, { Schema, Document } from 'mongoose';
import type { CloudinaryAsset } from '@/lib/shared/types/MediaAsset';

export interface SeoEntryDocument extends Document {
  pagePath: string;
  locale: string;
  title: string;
  description: string;
  canonical: string;
  ogImage?: CloudinaryAsset;
  jsonLd?: Record<string, unknown>;
  hiddenHtml?: string;
  keywords: string[];
  lastGeneratedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

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

const seoEntrySchema = new Schema<SeoEntryDocument>(
  {
    pagePath: { type: String, required: true, trim: true },
    locale: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    canonical: { type: String, required: true },
    ogImage: { type: cloudinaryAssetSchema },
    jsonLd: { type: Schema.Types.Mixed },
    hiddenHtml: { type: String },
    keywords: { type: [String], default: [] },
    lastGeneratedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        const r = ret as Record<string, unknown>;
        r.id = ret._id.toString();
        delete r._id;
        delete r.__v;
        return ret;
      },
    },
  }
);

seoEntrySchema.index({ pagePath: 1, locale: 1 }, { unique: true });
seoEntrySchema.index({ lastGeneratedAt: 1 });

const SeoEntry = mongoose.models.SeoEntry ?? mongoose.model<SeoEntryDocument>('SeoEntry', seoEntrySchema);

export default SeoEntry;
