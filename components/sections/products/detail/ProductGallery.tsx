'use client';

import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import type { CloudinaryAsset } from '@/lib/shared/types/MediaAsset';

type Props = {
  images: CloudinaryAsset[];
  name: string;
};

export function ProductGallery({ images, name }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const current = images[selectedIndex];

  if (!images.length) {
    return (
      <Box
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          bgcolor: 'neutral.100',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: 'neutral.500' }}>
          {name}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'neutral.100',
          mb: 1.5,
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={current.secureUrl}
          alt={name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s',
          }}
          loading="lazy"
        />
      </Box>

      {images.length > 1 && (
        <Stack direction="row" spacing={1} useFlexGap>
          {images.map((img, idx) => (
            <Box
              key={img.publicId}
              component="button"
              onClick={() => setSelectedIndex(idx)}
              sx={{
                width: 72,
                height: 72,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '2px solid',
                borderColor: idx === selectedIndex ? 'primary.500' : 'neutral.200',
                p: 0,
                bgcolor: 'neutral.100',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: 'primary.300' },
              }}
            >
              <Box
                component="img"
                src={img.secureUrl}
                alt={`${name} — vue ${idx + 1}`}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
