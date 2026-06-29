/**
 * Upload folder paths for media assets.
 */
export const MediaAssetFolder = {
  /** Product images */
  PRODUCT: 'product',
  /** Article / blog images */
  ARTICLE: 'article',
  /** Event images */
  EVENT: 'event',
  /** Brand / logo images */
  BRAND: 'brand',
  /** User avatar images */
  USER_AVATAR: 'user-avatar',
  /** Open Graph / social share images */
  OG: 'og',
} as const;

export type MediaAssetFolder = (typeof MediaAssetFolder)[keyof typeof MediaAssetFolder];

export const MediaAssetFolderValues = Object.values(MediaAssetFolder) as readonly MediaAssetFolder[];
