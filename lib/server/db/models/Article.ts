import 'server-only';
import mongoose, { Schema, Document, Types } from 'mongoose';
import { ArticleStatus, ArticleStatusValues } from '@/lib/shared/constants/ArticleStatus';
import type { ArticleBody, CloudinaryAsset } from '@/lib/shared/types/Article';

export interface ArticleDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  body: ArticleBody;
  heroImage: CloudinaryAsset;
  author: Types.ObjectId;
  tags: string[];
  publishedAt?: Date;
  status: string;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const articleBodySchema = new Schema<ArticleBody>(
  {
    markdown: { type: String, required: true },
    wordCount: { type: Number, required: true },
    readingTime: { type: Number, required: true },
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

const articleSchema = new Schema<ArticleDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    excerpt: { type: String, required: true },
    body: { type: articleBodySchema, required: true },
    heroImage: { type: cloudinaryAssetSchema, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tags: { type: [String], default: [] },
    publishedAt: { type: Date },
    status: { type: String, required: true, default: ArticleStatus.DRAFT, enum: ArticleStatusValues },
    commentCount: { type: Number, required: true, default: 0 },
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

articleSchema.index({ status: 1, publishedAt: -1 });
articleSchema.index({ deletedAt: 1 });

const Article = mongoose.models.Article ?? mongoose.model<ArticleDocument>('Article', articleSchema);

export default Article;
