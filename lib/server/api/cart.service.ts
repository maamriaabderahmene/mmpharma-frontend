import 'server-only';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { Cart, CartLineItem } from '@/lib/shared/types/Cart';
import type { Product } from '@/lib/shared/types/Product';
import type { Order } from '@/lib/shared/types/Order';
import type { SessionPayload } from '@/lib/shared/types/Session';
import { addToCartSchema, updateCartItemSchema } from '@/lib/shared/schemas/cart';
import * as cartsRepo from './carts.repo';
import * as productsRepo from './products.repo';
import * as ordersRepo from './orders.repo';

async function findOrCreateCart(sessionOrUserId: string): Promise<Cart> {
  const [bySession, byUser] = await Promise.all([
    cartsRepo.bySession(sessionOrUserId),
    cartsRepo.byUser(sessionOrUserId),
  ]);
  return (byUser ?? bySession) as Cart;
}

export async function getCart(sessionOrUserId: string): Promise<Cart | null> {
  return findOrCreateCart(sessionOrUserId);
}

export async function addToCart(
  sessionOrUserId: string,
  productId: string,
  qty: number,
  conditionnement: string,
): Promise<Cart> {
  const parsed = addToCartSchema.parse({ productId, quantity: qty });

  const product = await productsRepo.byCode(productId).catch(() => null) ?? await productsRepo.bySlug(productId);
  if (!product) {
    throw new ApiError(404, 'NOT_FOUND', 'Product not found');
  }

  const item: CartLineItem & { productId: string } = {
    productId: product.id,
    productName: product.name,
    productCode: product.code,
    productImage: product.images[0]?.url ?? '',
    quantity: parsed.quantity,
    conditionnement,
    unitPrice: 0,
    lineTotal: 0,
    slug: product.slug,
  };

  const cart = await findOrCreateCart(sessionOrUserId);

  if (cart?.id) {
    const existingItem = cart.items.find((i) => i.productId === product.id && i.conditionnement === conditionnement);
    if (existingItem) {
      return cartsRepo.updateItem(cart.id, product.id, existingItem.quantity + parsed.quantity);
    }
    return cartsRepo.addItem(cart.id, item);
  }

  const upserted = await cartsRepo.upsert(sessionOrUserId, [item]);
  return upserted;
}

export async function updateItem(cartId: string, itemId: string, qty: number): Promise<Cart> {
  const parsed = updateCartItemSchema.parse({ productId: itemId, quantity: qty });
  return cartsRepo.updateItem(cartId, itemId, parsed.quantity);
}

export async function removeItem(cartId: string, itemId: string): Promise<Cart> {
  return cartsRepo.removeItem(cartId, itemId);
}

export async function checkout(cartId: string, userId: string): Promise<Order> {
  const cart = await cartsRepo.byUser(userId);
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'BAD_REQUEST', 'Cart is empty');
  }

  const order = await ordersRepo.create({
    userId,
    items: cart.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      productCode: item.productCode,
      productImage: item.productImage,
      quantity: item.quantity,
      conditionnement: item.conditionnement,
      unitPrice: item.unitPrice,
      lineTotal: item.lineTotal,
    })),
    status: 'pending' as const,
    billingAddress: {
      firstName: '',
      lastName: '',
      line1: '',
      city: '',
      zip: '',
      country: '',
      phone: '',
    },
    shippingAddress: {
      firstName: '',
      lastName: '',
      line1: '',
      city: '',
      zip: '',
      country: '',
      phone: '',
    },
    subtotal: cart.items.reduce((sum, i) => sum + i.lineTotal, 0),
    tax: 0,
    total: cart.items.reduce((sum, i) => sum + i.lineTotal, 0),
    paymentMethod: 'card',
  });

  await cartsRepo.clear(cartId);

  return order;
}

export async function clearCart(cartId: string): Promise<void> {
  await cartsRepo.clear(cartId);
}
