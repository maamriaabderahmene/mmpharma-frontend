import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { Address, CreateAddressInput, UpdateAddressInput } from '@/lib/shared/types/Address';
import { createAddressSchema, updateAddressSchema } from '@/lib/shared/schemas/address';
import AddressModel from '@/lib/server/db/models/Address';

/**
 * Retrieve all addresses for a specific user.
 * @example
 * const addresses = await byUser('64a...');
 */
export async function byUser(userId: string): Promise<Address[]> {
  await connectDB();
  const addresses = await AddressModel.find({ userId }).sort({ isDefault: -1, createdAt: -1 }).lean().exec();
  return addresses as unknown as Address[];
}

/**
 * Find an address by its unique identifier.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const address = await byId('64a...');
 */
export async function byId(id: string): Promise<Address> {
  await connectDB();
  const address = await AddressModel.findById(id).lean().exec();
  if (!address) throw new ApiError(404, 'NOT_FOUND', `Address ${id} not found`);
  return address as unknown as Address;
}

/**
 * Create a new address for a user.
 * @example
 * const address = await create({ userId: '64a...', line1: '123 Main St', ... });
 */
export async function create(input: CreateAddressInput): Promise<Address> {
  const parsed = createAddressSchema.parse(input);
  await connectDB();

  if (parsed.isDefault) {
    await AddressModel.updateMany({ userId: parsed.userId }, { $set: { isDefault: false } }).exec();
  }

  const address = await AddressModel.create(parsed);
  return address.toObject() as unknown as Address;
}

/**
 * Update an existing address.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const address = await update('64a...', { line1: '456 Oak Ave' });
 */
export async function update(id: string, input: UpdateAddressInput): Promise<Address> {
  const parsed = updateAddressSchema.parse(input);
  await connectDB();

  if (parsed.isDefault) {
    const existing = await AddressModel.findById(id).exec();
    if (existing) {
      await AddressModel.updateMany({ userId: existing.get('userId') }, { $set: { isDefault: false } }).exec();
    }
  }

  const address = await AddressModel.findByIdAndUpdate(id, { $set: parsed }, { new: true }).exec();
  if (!address) throw new ApiError(404, 'NOT_FOUND', `Address ${id} not found`);
  return address.toObject() as unknown as Address;
}

/**
 * Soft-delete an address.
 * @throws {ApiError} NOT_FOUND
 * @example
 * await softDelete('64a...');
 */
export async function softDelete(id: string): Promise<void> {
  await connectDB();
  const result = await AddressModel.findByIdAndDelete(id).exec();
  if (!result) throw new ApiError(404, 'NOT_FOUND', `Address ${id} not found`);
}

/**
 * Set an address as the default for a user, unsetting any previous default.
 * @throws {ApiError} NOT_FOUND
 * @example
 * await setDefault('64a...', '64b...');
 */
export async function setDefault(id: string, userId: string): Promise<void> {
  await connectDB();
  const address = await AddressModel.findOne({ _id: id, userId }).exec();
  if (!address) throw new ApiError(404, 'NOT_FOUND', `Address ${id} not found for user ${userId}`);

  await AddressModel.updateMany({ userId }, { $set: { isDefault: false } }).exec();
  await AddressModel.findByIdAndUpdate(id, { $set: { isDefault: true } }).exec();
}
