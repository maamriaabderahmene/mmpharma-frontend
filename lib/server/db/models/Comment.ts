import 'server-only';
import mongoose, { Schema, Document, Types } from 'mongoose';
import { CommentStatus, CommentStatusValues } from '@/lib/shared/constants/CommentStatus';
import type { CommentReaction } from '@/lib/shared/types/Comment';

interface CommentAuthor {
  name: string;
  email: string;
  avatar?: string;
}

export interface CommentDocument extends Document {
  articleId: Types.ObjectId;
  parentId?: Types.ObjectId;
  author: CommentAuthor;
  body: string;
  status: string;
  reactions: CommentReaction[];
  depth: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const commentAuthorSchema = new Schema<CommentAuthor>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    avatar: { type: String },
  },
  { _id: false }
);

const commentReactionSchema = new Schema(
  {
    type: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { _id: false }
);

const commentSchema = new Schema<CommentDocument>(
  {
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true, index: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    author: { type: commentAuthorSchema, required: true },
    body: { type: String, required: true },
    status: { type: String, required: true, default: CommentStatus.PENDING, enum: CommentStatusValues },
    reactions: { type: [commentReactionSchema], default: [] },
    depth: { type: Number, required: true, default: 0 },
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

commentSchema.index({ articleId: 1, status: 1, createdAt: -1 });
commentSchema.index({ parentId: 1 });
commentSchema.index({ deletedAt: 1 });

const Comment = mongoose.models.Comment ?? mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment;
