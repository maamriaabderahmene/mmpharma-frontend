import type { ObjectId } from './ObjectId';
import type { OrderStatus } from '@/lib/shared/constants/OrderStatus';

/**
 * A single line item within an order.
 */
export interface OrderLineItem {
  /** Product identifier */
  productId: ObjectId;
  /** Product name at time of order */
  productName: string;
  /** Product code at time of order */
  productCode: string;
  /** Product image URL at time of order */
  productImage: string;
  /** Quantity ordered */
  quantity: number;
  /** Selected packaging format */
  conditionnement: string;
  /** Price per unit */
  unitPrice: number;
  /** Total for this line (quantity × unitPrice) */
  lineTotal: number;
}

/**
 * Snapshot of an address at order time.
 */
export interface OrderAddressSnapshot {
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** Company or organisation */
  company?: string;
  /** Address line 1 */
  line1: string;
  /** Address line 2 */
  line2?: string;
  /** City */
  city: string;
  /** State / region */
  state?: string;
  /** Postal code */
  zip: string;
  /** Country */
  country: string;
  /** Contact phone */
  phone: string;
}

/**
 * A single entry in the order status timeline.
 */
export interface OrderTimeline {
  /** Order status at this point */
  status: OrderStatus;
  /** ISO-8601 timestamp of the status change */
  timestamp: string;
  /** Optional note explaining the change */
  note?: string;
}

/**
 * Order entity representing a customer purchase.
 */
export interface Order {
  /** Unique identifier */
  id: ObjectId;
  /** User who placed the order */
  userId: ObjectId;
  /** Ordered line items */
  items: OrderLineItem[];
  /** Current order status */
  status: OrderStatus;
  /** Billing address snapshot */
  billingAddress: OrderAddressSnapshot;
  /** Shipping address snapshot */
  shippingAddress: OrderAddressSnapshot;
  /** Subtotal before tax */
  subtotal: number;
  /** Tax amount */
  tax: number;
  /** Grand total */
  total: number;
  /** Payment method used */
  paymentMethod: string;
  /** Customer notes */
  notes?: string;
  /** Status change timeline */
  timeline: OrderTimeline[];
  /** ISO-8601 timestamp of creation */
  createdAt: string;
  /** ISO-8601 timestamp of last update */
  updatedAt: string;
  /** ISO-8601 timestamp of soft-deletion */
  deletedAt?: string;
}

/**
 * Input for creating a new order.
 */
export type CreateOrderInput = Omit<Order, 'id' | 'timeline' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

/**
 * Input for updating an existing order (all fields optional).
 */
export type UpdateOrderInput = Partial<CreateOrderInput>;
