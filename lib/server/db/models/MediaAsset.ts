import 'server-only';
import mongoose, { Schema, Document, Types } from 'mongoose';
import { MediaAssetFolder, MediaAssetFolderValues } from '@/lib/shared/constants/MediaAssetFolder';
import { MediaAssetKind, MediaAssetKindValues } from '@/lib/shared/constants/MediaAssetKind';

export interface MediaAssetDocument extends Document {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  folder: string;
  kind: string;
  alt: string;
  caption?: string;
  productId?: Types.ObjectId;
  articleId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const mediaAssetSchema = new Schema<MediaAssetDocument>(
  {
    publicId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    secureUrl: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    format: { type: String, required: true },
    bytes: { type: Number, required: true },
    folder: { type: String, required: true, enum: MediaAssetFolderValues },
    kind: { type: String, required: true, enum: MediaAssetKindValues },
    alt: { type: String, required: true },
    caption: { type: String },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
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

mediaAssetSchema.index({ folder: 1, kind: 1 });
mediaAssetSchema.index({ productId: 1 });
mediaAssetSchema.index({ articleId: 1 });

const MediaAsset = mongoose.models.MediaAsset ?? mongoose.model<MediaAssetDocument>('MediaAsset', mediaAssetSchema);

export default MediaAsset;
