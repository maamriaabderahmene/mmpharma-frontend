import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { Cart, CartLineItem } from '@/lib/shared/types/Cart';
import { addToCartSchema, updateCartItemSchema } from '@/lib/shared/schemas/cart';
import CartModel from '@/lib/server/db/models/Cart';

/**
 * Find a cart by its session identifier (anonymous cart).
 * @example
 * const cart = await bySession('sess_abc123');
 */
export async function bySession(sessionId: string): Promise<Cart | null> {
  await connectDB();
  const cart = await CartModel.findOne({ sessionId }).lean().exec();
  return cart as Cart | null;
}

/**
 * Find a cart by its associated user identifier.
 * @example
 * const cart = await byUser('64a...');
 */
export async function byUser(userId: string): Promise<Cart | null> {
  await connectDB();
  const cart = await CartModel.findOne({ userId }).lean().exec();
  return cart as Cart | null;
}

/**
 * Upsert a cart — create if not existing or replace items.
 * Accepts either a sessionId (anonymous) or userId (authenticated).
 * @example
 * const cart = await upsert('sess_abc123', items);
 * const cart = await upsert('64a...', items);
 */
export async function upsert(
  identifier: string,
  items: CartLineItem[],
): Promise<Cart> {
  await connectDB();
  const filter = { $or: [{ sessionId: identifier }, { userId: identifier }] };
  const update = { $set: { items, updatedAt: new Date().toISOString() } };
  const options = { upsert: true, new: true };

  const cart = await CartModel.findOneAndUpdate(filter, update, options).exec();
  return cart.toObject() as unknown as Cart;
}

/**
 * Add an item to a cart.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const cart = await addItem('64a...', { productId: '64b...', quantity: 2, ... });
 */
export async function addItem(cartId: string, item: CartLineItem): Promise<Cart> {
  const parsed = addToCartSchema.parse(item);
  await connectDB();
  const cart = await CartModel.findByIdAndUpdate(
    cartId,
    { $push: { items: parsed }, $set: { updatedAt: new Date().toISOString() } },
    { new: true },
  ).exec();
  if (!cart) throw new ApiError(404, 'NOT_FOUND', `Cart ${cartId} not found`);
  return cart.toObject() as unknown as Cart;
}

/**
 * Update the quantity of a cart line item.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const cart = await updateItem('64a...', '64b...', 3);
 */
export async function updateItem(cartId: string, itemId: string, qty: number): Promise<Cart> {
  await connectDB();
  const cart = await CartModel.findOneAndUpdate(
    { _id: cartId, 'items.productId': itemId },
    { $set: { 'items.$.quantity': qty, updatedAt: new Date().toISOString() } },
    { new: true },
  ).exec();
  if (!cart) throw new ApiError(404, 'NOT_FOUND', `Cart ${cartId} or item ${itemId} not found`);
  return cart.toObject() as unknown as Cart;
}

/**
 * Remove an item from a cart.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const cart = await removeItem('64a...', '64b...');
 */
export async function removeItem(cartId: string, itemId: string): Promise<Cart> {
  await connectDB();
  const cart = await CartModel.findByIdAndUpdate(
    cartId,
    { $pull: { items: { productId: itemId } }, $set: { updatedAt: new Date().toISOString() } },
    { new: true },
  ).exec();
  if (!cart) throw new ApiError(404, 'NOT_FOUND', `Cart ${cartId} not found`);
  return cart.toObject() as unknown as Cart;
}

/**
 * Remove all items from a cart.
 * @throws {ApiError} NOT_FOUND
 * @example
 * await clear('64a...');
 */
export async function clear(cartId: string): Promise<void> {
  await connectDB();
  const result = await CartModel.findByIdAndUpdate(
    cartId,
    { $set: { items: [], updatedAt: new Date().toISOString() } },
  ).exec();
  if (!result) throw new ApiError(404, 'NOT_FOUND', `Cart ${cartId} not found`);
}
