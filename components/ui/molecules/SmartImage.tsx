'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { buildCloudinaryUrl, buildBlurPlaceholderUrl } from '@/lib/shared/utils/cloudinaryUrl';

type SmartImageProps = Omit<ImageProps, 'src' | 'blurDataURL' | 'placeholder'> & {
  publicId: string;
  alt: string;
  width: number;
  height: number;
};

export function SmartImage({
  publicId,
  alt,
  width,
  height,
  className,
  priority,
  ...rest
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  const url = buildCloudinaryUrl(publicId, { width, height, crop: 'fill' });
  const blurUrl = buildBlurPlaceholderUrl(publicId);

  if (hasError) {
    return (
      <div
        className={className}
        style={{ width, height, backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        aria-label={alt}
        role="img"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={className}
      placeholder="blur"
      blurDataURL={blurUrl}
      priority={priority}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}
