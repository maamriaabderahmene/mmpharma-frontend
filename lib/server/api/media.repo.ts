import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { MediaAsset, CreateMediaAssetInput, UpdateMediaAssetInput } from '@/lib/shared/types/MediaAsset';
import { createMediaAssetSchema } from '@/lib/shared/schemas/media';
import MediaModel from '@/lib/server/db/models/MediaAsset';

/**
 * Find a media asset by its Cloudinary public ID.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const asset = await byPublicId('products/gel-nettoyant');
 */
export async function byPublicId(publicId: string): Promise<MediaAsset> {
  await connectDB();
  const asset = await MediaModel.findOne({ publicId }).lean().exec();
  if (!asset) throw new ApiError(404, 'NOT_FOUND', `Media asset with publicId ${publicId} not found`);
  return asset as unknown as MediaAsset;
}

/**
 * Retrieve all media assets associated with a product.
 * @example
 * const assets = await byProduct('64a...');
 */
export async function byProduct(productId: string): Promise<MediaAsset[]> {
  await connectDB();
  const assets = await MediaModel.find({ productId }).sort({ createdAt: -1 }).lean().exec();
  return assets as unknown as MediaAsset[];
}

/**
 * Create a new media asset record.
 * @example
 * const asset = await create({ publicId: 'products/img', url: 'https://...', ... });
 */
export async function create(input: CreateMediaAssetInput): Promise<MediaAsset> {
  const parsed = createMediaAssetSchema.parse(input);
  await connectDB();
  const asset = await MediaModel.create(parsed);
  return asset.toObject() as unknown as MediaAsset;
}

/**
 * Update an existing media asset.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const asset = await update('64a...', { alt: 'Updated alt text' });
 */
export async function update(id: string, input: UpdateMediaAssetInput): Promise<MediaAsset> {
  await connectDB();
  const asset = await MediaModel.findByIdAndUpdate(id, { $set: input }, { new: true }).exec();
  if (!asset) throw new ApiError(404, 'NOT_FOUND', `Media asset ${id} not found`);
  return asset.toObject() as unknown as MediaAsset;
}

/**
 * Soft-delete a media asset.
 * @throws {ApiError} NOT_FOUND
 * @example
 * await softDelete('64a...');
 */
export async function softDelete(id: string): Promise<void> {
  await connectDB();
  const result = await MediaModel.findByIdAndUpdate(id, { $set: { deletedAt: new Date().toISOString() } }).exec();
  if (!result) throw new ApiError(404, 'NOT_FOUND', `Media asset ${id} not found`);
}
