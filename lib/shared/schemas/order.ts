/**
 * Zod schemas for Order entities.
 * Validates full order records and order creation from cart.
 */
import { z } from 'zod';
import {
  OrderStatus,
  OrderStatusValues,
} from '@/lib/shared/constants/OrderStatus';

export const orderSchema = z.object({
  id: z.number().positive().int(),
  orderNumber: z.string().min(1).max(50),
  userId: z.number().positive().int(),
  status: z.enum(OrderStatusValues as unknown as [string, ...string[]]),
  items: z.array(z.object({
    productId: z.number().positive().int(),
    name: z.string().min(1),
    quantity: z.number().int().positive(),
    unitPrice: z.number().nonnegative(),
    conditionnement: z.string().optional(),
  })),
  subtotal: z.number().nonnegative(),
  shipping: z.number().nonnegative().default(0),
  tax: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),
  currency: z.string().length(3).default('EUR'),
  shippingAddressId: z.number().positive().int().optional(),
  billingAddressId: z.number().positive().int().optional(),
  notes: z.string().max(1000).optional(),
  paidAt: z.date().optional(),
  shippedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).strict();

export type Order = z.infer<typeof orderSchema>;

export const orderItemSchema = z.object({
  productId: z.number().positive().int(),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  conditionnement: z.string().optional(),
}).strict();

export type OrderItem = z.infer<typeof orderItemSchema>;

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  shippingAddressId: z.number().positive().int().optional(),
  billingAddressId: z.number().positive().int().optional(),
  notes: z.string().max(1000).optional(),
}).strict();

export type CreateOrder = z.infer<typeof createOrderSchema>;
