import 'server-only';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { Order } from '@/lib/shared/types/Order';
import type { SessionPayload } from '@/lib/shared/types/Session';
import { createOrderSchema } from '@/lib/shared/schemas/order';
import * as ordersRepo from './orders.repo';
import * as cartsRepo from './carts.repo';
import * as addressesRepo from './addresses.repo';

interface OrderFilter {
  status?: string;
  page?: number;
  limit?: number;
}

export async function listMine(userId: string, filter: OrderFilter = {}): Promise<{
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  return ordersRepo.list(userId, filter);
}

export async function getDetail(userId: string, orderId: string): Promise<Order> {
  const order = await ordersRepo.byId(orderId, userId);
  return order;
}

export async function create(userId: string, cartId: string, addressId: string): Promise<Order> {
  const cart = await cartsRepo.byUser(userId);
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'BAD_REQUEST', 'Cart is empty');
  }

  const address = await addressesRepo.byId(addressId);
  if (address.userId !== userId) {
    throw new ApiError(403, 'FORBIDDEN', 'Address does not belong to user');
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.lineTotal, 0);

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
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      phone: address.phone,
    },
    shippingAddress: {
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      phone: address.phone,
    },
    subtotal,
    tax: 0,
    total: subtotal,
    paymentMethod: 'card',
  });

  await cartsRepo.clear(cartId);

  return order;
}
