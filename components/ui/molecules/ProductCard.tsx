'use client';

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
  Badge,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/shared/types/Product';
import { useTranslations } from '@/lib/i18n/client';

const RANGE_LABELS: Record<string, string> = {
  hygiene: 'Gamme I — Hygiène',
  detergent: 'Gamme II — Détergent',
  disinfectant: 'Gamme III — Désinfectant',
  inox: 'Gamme IV — Inox',
  misc: 'Gamme V — Divers',
};

type Props = {
  product: Product;
  locale: string;
};

export function ProductCard({ product, locale }: Props) {
  const router = useRouter();
  const t = useTranslations('products');

  const imageUrl = product.images?.[0]?.secureUrl;
  const detailUrl = `/${locale}/products/${product.slug}`;

  return (
    <Badge
      badgeContent="Haute gamme"
      color="warning"
      invisible={!product.isHauteGamme}
      slotProps={{
        badge: {
          sx: {
            top: 12,
            right: 12,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.04em',
            px: 1,
            py: 0.5,
            textTransform: 'uppercase',
          },
        },
      }}
    >
      <Card
        sx={{
          width: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            borderColor: 'primary.main',
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(14, 90, 167, 0.12)',
          },
        }}
        onClick={() => router.push(detailUrl)}
      >
        <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', bgcolor: 'neutral.100' }}>
          {imageUrl ? (
            <CardMedia
              component="img"
              image={imageUrl}
              alt={product.name}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'neutral.100',
              }}
            >
              <Typography variant="caption" sx={{ color: 'neutral.500' }}>
                {product.code}
              </Typography>
            </Box>
          )}
        </Box>

        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: 'neutral.500', fontWeight: 600 }}>
              {product.code}
            </Typography>
            <Chip
              label={RANGE_LABELS[product.range] ?? product.range}
              size="small"
              sx={{
                height: 20,
                fontSize: 10,
                fontWeight: 600,
                bgcolor: 'primary.50',
                color: 'primary.500',
              }}
            />
          </Stack>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </Typography>

          {product.scent && (
            <Typography variant="caption" sx={{ color: 'neutral.700' }}>
              Parfum : {product.scent}
            </Typography>
          )}

          {product.conditionnement && product.conditionnement.length > 0 && (
            <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
              {product.conditionnement.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  size="small"
                  variant="outlined"
                  sx={{ height: 20, fontSize: 10, borderColor: 'neutral.300', color: 'neutral.700' }}
                />
              ))}
            </Stack>
          )}
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            variant="primary"
            fullWidth
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {t('addToCart')}
          </Button>
        </CardActions>
      </Card>
    </Badge>
  );
}
