/**
 * Address usage kinds.
 */
export const AddressKind = {
  /** Billing address only */
  BILLING: 'billing',
  /** Shipping address only */
  SHIPPING: 'shipping',
  /** Used for both billing and shipping */
  BOTH: 'both',
} as const;

export type AddressKind = (typeof AddressKind)[keyof typeof AddressKind];

export const AddressKindValues = Object.values(AddressKind) as readonly AddressKind[];
