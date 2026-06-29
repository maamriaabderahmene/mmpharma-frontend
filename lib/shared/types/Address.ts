import type { ObjectId } from './ObjectId';
import type { AddressKind } from '@/lib/shared/constants/AddressKind';

/**
 * Address entity for billing and shipping.
 */
export interface Address {
  /** Unique identifier */
  id: ObjectId;
  /** User who owns this address */
  userId: ObjectId;
  /** Address usage kind */
  kind: AddressKind;
  /** Human-readable label (e.g. "Home", "Office") */
  label: string;
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
  /** Contact phone number */
  phone: string;
  /** Whether this is the default address for the user */
  isDefault: boolean;
  /** ISO-8601 timestamp of creation */
  createdAt: string;
  /** ISO-8601 timestamp of last update */
  updatedAt: string;
}

/**
 * Input for creating a new address.
 */
export type CreateAddressInput = Omit<Address, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Input for updating an existing address (all fields optional).
 */
export type UpdateAddressInput = Partial<CreateAddressInput>;
