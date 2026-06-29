/**
 * Order lifecycle statuses.
 */
export const OrderStatus = {
  /** Order has been placed but not yet confirmed */
  PENDING: 'pending',
  /** Order has been confirmed */
  CONFIRMED: 'confirmed',
  /** Order is being processed */
  PROCESSING: 'processing',
  /** Order has been shipped */
  SHIPPED: 'shipped',
  /** Order has been delivered */
  DELIVERED: 'delivered',
  /** Order has been cancelled */
  CANCELLED: 'cancelled',
  /** Order has been refunded */
  REFUNDED: 'refunded',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const OrderStatusValues = Object.values(OrderStatus) as readonly OrderStatus[];
