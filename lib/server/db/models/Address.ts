import 'server-only';
import mongoose, { Schema, Document, Types } from 'mongoose';
import { AddressKind, AddressKindValues } from '@/lib/shared/constants/AddressKind';

export interface AddressDocument extends Document {
  userId: Types.ObjectId;
  kind: string;
  label: string;
  firstName: string;
  lastName: string;
  company?: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<AddressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    kind: { type: String, required: true, enum: AddressKindValues },
    label: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    zip: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, required: true, default: false },
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

addressSchema.index({ userId: 1, kind: 1 });
addressSchema.index({ userId: 1, isDefault: 1 });

const Address = mongoose.models.Address ?? mongoose.model<AddressDocument>('Address', addressSchema);

export default Address;
