/**
 * Zod schemas for Cart entities.
 * Validates the shopping cart and add-to-cart payloads.
 */
import { z } from 'zod';

export const cartItemSchema = z.object({
  productId: z.number().positive().int(),
  name: z.string().min(1).optional(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative().optional(),
  conditionnement: z.string().optional(),
  imageUrl: z.string().url().optional(),
}).strict();

export type CartItem = z.infer<typeof cartItemSchema>;

export const cartSchema = z.object({
  id: z.number().positive().int().optional(),
  userId: z.number().positive().int(),
  items: z.array(cartItemSchema),
  couponCode: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).strict();

export type Cart = z.infer<typeof cartSchema>;

export const addToCartSchema = z.object({
  productId: z.number().positive().int(),
  quantity: z.number().int().positive().default(1),
  conditionnement: z.string().optional(),
}).strict();

export type AddToCart = z.infer<typeof addToCartSchema>;

export const updateCartItemSchema = z.object({
  productId: z.number().positive().int(),
  quantity: z.number().int().nonnegative(),
  conditionnement: z.string().optional(),
}).strict();

export type UpdateCartItem = z.infer<typeof updateCartItemSchema>;
