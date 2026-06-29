import type { MediaAssetTransformations } from '@/lib/shared/types/MediaAsset';

const DEFAULT_CLOUD_NAME = 'mmpharma';
const BASE_URL = `https://res.cloudinary.com/${DEFAULT_CLOUD_NAME}/image/upload`;

function buildTransformations(transformations: MediaAssetTransformations): string {
  const parts: string[] = ['f_auto', 'q_auto'];

  if (transformations.width) parts.push(`w_${transformations.width}`);
  if (transformations.height) parts.push(`h_${transformations.height}`);
  if (transformations.crop) parts.push(`c_${transformations.crop}`);
  if (transformations.quality) parts.push(`q_${transformations.quality}`);
  if (transformations.format) parts.push(`f_${transformations.format}`);

  return parts.join(',');
}

export function buildCloudinaryUrl(
  publicId: string,
  transformations: MediaAssetTransformations = {},
): string {
  const tx = buildTransformations(transformations);
  return `${BASE_URL}/${tx}/${publicId}`;
}

export function buildBlurPlaceholderUrl(publicId: string): string {
  return `${BASE_URL}/w_20,c_scale,e_blur:400,q_auto,f_auto/${publicId}`;
}
