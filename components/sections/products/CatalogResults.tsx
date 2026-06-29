'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import { useTranslations } from '@/lib/i18n/client';
import { ProductCard } from '@/components/ui/molecules/ProductCard';
import type { Product } from '@/lib/shared/types/Product';

type Props = {
  locale: string;
  products: Product[];
  loading?: boolean;
};

function SkeletonCard() {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: 2,
        bgcolor: 'neutral.100',
        animation: 'pulse 1.5s ease-in-out infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
      }}
    />
  );
}

export function CatalogResults({ locale, products, loading }: Props) {
  const t = useTranslations('products');

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 12,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ color: 'text.primary', mb: 1 }}>
            {t('empty')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('filter.reset')}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard product={product} locale={locale} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
