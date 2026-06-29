import 'server-only';
import mongoose, { Schema, Document, Types } from 'mongoose';
import { OrderStatus, OrderStatusValues } from '@/lib/shared/constants/OrderStatus';
import type { OrderLineItem, OrderAddressSnapshot, OrderTimeline } from '@/lib/shared/types/Order';

export interface OrderDocument extends Document {
  userId: Types.ObjectId;
  items: OrderLineItem[];
  status: string;
  billingAddress: OrderAddressSnapshot;
  shippingAddress: OrderAddressSnapshot;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  notes?: string;
  timeline: OrderTimeline[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const orderLineItemSchema = new Schema<OrderLineItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productCode: { type: String, required: true },
    productImage: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    conditionnement: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    lineTotal: { type: Number, required: true },
  },
  { _id: false }
);

const orderAddressSnapshotSchema = new Schema<OrderAddressSnapshot>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const orderTimelineSchema = new Schema<OrderTimeline>(
  {
    status: { type: String, required: true, enum: OrderStatusValues },
    timestamp: { type: Date, required: true },
    note: { type: String },
  },
  { _id: false }
);

const orderSchema = new Schema<OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: { type: [orderLineItemSchema], required: true, validate: [(v: OrderLineItem[]) => v.length > 0, 'Order must have at least one item'] },
    status: { type: String, required: true, default: OrderStatus.PENDING, enum: OrderStatusValues },
    billingAddress: { type: orderAddressSnapshotSchema, required: true },
    shippingAddress: { type: orderAddressSnapshotSchema, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    notes: { type: String },
    timeline: { type: [orderTimelineSchema], default: [] },
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

orderSchema.index({ userId: 1, status: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ deletedAt: 1 });

const Order = mongoose.models.Order ?? mongoose.model<OrderDocument>('Order', orderSchema);

export default Order;
