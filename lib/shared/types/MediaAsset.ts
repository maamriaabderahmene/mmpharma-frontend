import type { ObjectId } from './ObjectId';
import type { MediaAssetFolder } from '@/lib/shared/constants/MediaAssetFolder';
import type { MediaAssetKind } from '@/lib/shared/constants/MediaAssetKind';

/**
 * Raw Cloudinary image / asset descriptor.
 */
export interface CloudinaryAsset {
  /** Cloudinary public ID */
  publicId: string;
  /** Asset URL (HTTP) */
  url: string;
  /** Asset URL (HTTPS) */
  secureUrl: string;
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
  /** File format (e.g. png, jpg, pdf) */
  format: string;
  /** File size in bytes */
  bytes: number;
}

/**
 * Image transformation parameters for Cloudinary URLs.
 */
export interface MediaAssetTransformations {
  /** Target width */
  width?: number;
  /** Target height */
  height?: number;
  /** Crop mode */
  crop?: string;
  /** Quality percentage */
  quality?: number;
  /** Output format override */
  format?: string;
}

/**
 * Media asset entity tracked in the application.
 */
export interface MediaAsset {
  /** Unique identifier */
  id: ObjectId;
  /** Cloudinary public ID */
  publicId: string;
  /** Asset URL (HTTP) */
  url: string;
  /** Asset URL (HTTPS) */
  secureUrl: string;
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
  /** File format */
  format: string;
  /** File size in bytes */
  bytes: number;
  /** Cloudinary folder path */
  folder: MediaAssetFolder;
  /** Asset content type */
  kind: MediaAssetKind;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption */
  caption?: string;
  /** Related product identifier */
  productId?: ObjectId;
  /** Related article identifier */
  articleId?: ObjectId;
  /** ISO-8601 timestamp of creation */
  createdAt: string;
  /** ISO-8601 timestamp of last update */
  updatedAt: string;
}

/**
 * Input for creating a new media asset.
 */
export type CreateMediaAssetInput = Omit<MediaAsset, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Input for updating an existing media asset (all fields optional).
 */
export type UpdateMediaAssetInput = Partial<CreateMediaAssetInput>;
