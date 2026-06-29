import type { ObjectId } from './ObjectId';

/**
 * A single line item in a shopping cart.
 */
export interface CartLineItem {
  /** Product identifier */
  productId: ObjectId;
  /** Product display name */
  productName: string;
  /** Product code (SKU) */
  productCode: string;
  /** Product image URL */
  productImage: string;
  /** Quantity selected */
  quantity: number;
  /** Selected packaging format */
  conditionnement: string;
  /** Price per unit */
  unitPrice: number;
  /** Total for this line (quantity × unitPrice) */
  lineTotal: number;
  /** Product URL slug */
  slug: string;
}

/**
 * Shopping cart entity.
 */
export interface Cart {
  /** Unique identifier */
  id: ObjectId;
  /** Associated user (null for anonymous carts) */
  userId?: ObjectId | null;
  /** Session identifier for anonymous carts */
  sessionId?: string;
  /** Cart line items */
  items: CartLineItem[];
  /** ISO-8601 timestamp of creation */
  createdAt: string;
  /** ISO-8601 timestamp of last update */
  updatedAt: string;
}

/**
 * Input for creating a new cart.
 */
export type CreateCartInput = Omit<Cart, 'id' | 'items' | 'createdAt' | 'updatedAt'>;

/**
 * Input for updating an existing cart (all fields optional).
 */
export type UpdateCartInput = Partial<CreateCartInput>;
