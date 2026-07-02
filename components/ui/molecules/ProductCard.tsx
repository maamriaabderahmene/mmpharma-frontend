'use client';

import { Typography, Box, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/shared/types/Product';
import { palette } from '@/theme/palette';

const RANGE_LABELS: Record<string, string> = {
  hygiene: 'Gamme I',
  detergent: 'Gamme II',
  disinfectant: 'Gamme III',
  inox: 'Gamme IV',
  misc: 'Gamme V',
};

const mono = "'JetBrains Mono', ui-monospace, monospace";

type Props = {
  product: Product;
  locale: string;
};

export function ProductCard({ product, locale }: Props) {
  const router = useRouter();
  const imageUrl = product.images?.[0]?.secureUrl;
  const detailUrl = `/${locale}/products/${product.slug}`;
  const navy = palette.primary[900];
  const gold = palette.accent[500];

  return (
    <Box
      onClick={() => router.push(detailUrl)}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#fff',
        border: `1px solid ${palette.neutral[200]}`,
        transition: 'all 0.35s cubic-bezier(.2,.6,.2,1)',
        position: 'relative',
        '&:hover': {
          borderColor: navy,
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 40px -20px rgba(10,25,47,0.25)',
        },
        '&:hover .arrow': { transform: 'translate(4px,-4px)', color: gold },
        '&:hover .imgwrap': { bgcolor: palette.neutral[100] },
      }}
    >
      {product.isHauteGamme && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 2,
            bgcolor: gold,
            color: navy,
            fontFamily: mono,
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            px: 1.2,
            py: 0.7,
            fontWeight: 700,
          }}
        >
          Haute gamme
        </Box>
      )}

      <Box className="imgwrap" sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', bgcolor: palette.neutral[50], transition: 'background 0.3s', overflow: 'hidden' }}>
        {imageUrl ? (
          <Box component="img" src={imageUrl} alt={product.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.24em', color: palette.neutral[500] }}>
              {product.code}
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.2, flex: 1 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', color: gold, textTransform: 'uppercase', fontWeight: 700 }}>
            {RANGE_LABELS[product.range] ?? product.range}
          </Typography>
          <Typography sx={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', color: palette.neutral[500] }}>
            {product.code}
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontWeight: 600,
            color: navy,
            fontSize: 16,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.5em',
          }}
        >
          {product.name}
        </Typography>

        {product.scent && (
          <Typography sx={{ fontSize: 12, color: palette.neutral[700] }}>
            Parfum · {product.scent}
          </Typography>
        )}

        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 1.5, mt: 'auto', borderTop: `1px solid ${palette.neutral[200]}` }}>
          <Typography sx={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', color: navy, textTransform: 'uppercase' }}>
            {product.conditionnement?.[0] ?? 'Voir fiche'}
          </Typography>
          <Box className="arrow" sx={{ fontSize: 18, color: navy, transition: 'all 0.3s', lineHeight: 1 }}>
            ↗
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
