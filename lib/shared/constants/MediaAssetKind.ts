/**
 * Media asset types.
 */
export const MediaAssetKind = {
  /** Image file (jpg, png, webp, etc.) */
  IMAGE: 'image',
  /** PDF document */
  PDF: 'pdf',
  /** Video file (mp4, etc.) */
  VIDEO: 'video',
} as const;

export type MediaAssetKind = (typeof MediaAssetKind)[keyof typeof MediaAssetKind];

export const MediaAssetKindValues = Object.values(MediaAssetKind) as readonly MediaAssetKind[];
