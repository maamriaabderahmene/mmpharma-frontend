import 'server-only';
import mongoose, { Schema, Document, Types } from 'mongoose';
import type { ProductMicrobio } from '@/lib/shared/types/Product';
import type { CloudinaryAsset } from '@/lib/shared/types/MediaAsset';
import { ProductRangeValues } from '@/lib/shared/constants/ProductRange';

export interface ProductDocument extends Document {
  code: string;
  name: string;
  range: string;
  category: string;
  scent?: string;
  description: string;
  indications: string[];
  composition: string[];
  conditionnement: string[];
  modeUtilisation: string[];
  microbiologie?: ProductMicrobio;
  images: CloudinaryAsset[];
  pdfs: CloudinaryAsset[];
  tags: string[];
  isHauteGamme: boolean;
  isActive: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
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

const productMicrobioSchema = new Schema<ProductMicrobio>(
  {
    germes: { type: String, required: true },
    levures: { type: String, required: true },
    escherichiaColi: { type: String, required: true },
    pseudomonasAeruginosa: { type: String, required: true },
    staphylococcusAureus: { type: String, required: true },
    candidaAlbicans: { type: String, required: true },
    conclusion: { type: String },
  },
  { _id: false }
);

const productSchema = new Schema<ProductDocument>(
  {
    code: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    range: { type: String, required: true, enum: ProductRangeValues },
    category: { type: String, required: true },
    scent: { type: String },
    description: { type: String, required: true },
    indications: [{ type: String }],
    composition: [{ type: String }],
    conditionnement: [{ type: String }],
    modeUtilisation: [{ type: String }],
    microbiologie: { type: productMicrobioSchema },
    images: [cloudinaryAssetSchema],
    pdfs: [cloudinaryAssetSchema],
    tags: [{ type: String }],
    isHauteGamme: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    slug: { type: String, required: true, unique: true, index: true },
    deletedAt: { type: Date, default: null },
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

productSchema.index({ range: 1, isActive: 1 });
productSchema.index({ name: 1 });

const Product = mongoose.models.Product ?? mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
