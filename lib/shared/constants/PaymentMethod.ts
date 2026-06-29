/**
 * Supported payment methods.
 */
export const PaymentMethod = {
  /** Bank transfer */
  BANK_TRANSFER: 'bank-transfer',
  /** Cash on delivery */
  CASH_ON_DELIVERY: 'cash-on-delivery',
  /** Online payment gateway */
  ONLINE: 'online',
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentMethodValues = Object.values(PaymentMethod) as readonly PaymentMethod[];
