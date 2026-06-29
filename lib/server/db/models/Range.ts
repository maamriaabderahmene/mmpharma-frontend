import 'server-only';
import mongoose, { Schema, Document } from 'mongoose';

export interface RangeDocument extends Document {
  key: string;
  label: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const rangeSchema = new Schema<RangeDocument>(
  {
    key: { type: String, required: true, unique: true, index: true },
    label: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
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

const Range = mongoose.models.Range ?? mongoose.model<RangeDocument>('Range', rangeSchema);

export default Range;
