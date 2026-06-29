import 'server-only';
import mongoose, { Schema, Document, Types } from 'mongoose';
import type { CartLineItem } from '@/lib/shared/types/Cart';

export interface CartDocument extends Document {
  userId?: Types.ObjectId | null;
  sessionId?: string;
  items: CartLineItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartLineItemSchema = new Schema<CartLineItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productCode: { type: String, required: true },
    productImage: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    conditionnement: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    lineTotal: { type: Number, required: true },
    slug: { type: String, required: true },
  },
  { _id: false }
);

const cartSchema = new Schema<CartDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true, default: null },
    sessionId: { type: String, trim: true },
    items: { type: [cartLineItemSchema], default: [] },
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

cartSchema.index({ sessionId: 1 });
cartSchema.index({ updatedAt: -1 });

const Cart = mongoose.models.Cart ?? mongoose.model<CartDocument>('Cart', cartSchema);

export default Cart;
