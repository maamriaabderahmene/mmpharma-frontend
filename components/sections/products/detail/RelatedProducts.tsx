import { Box, Container, Typography, Grid } from '@mui/material';
import { ProductCard } from '@/components/ui/molecules/ProductCard';
import { getTranslations } from '@/lib/i18n/server';
import type { Product } from '@/lib/shared/types/Product';

type Props = {
  products: Product[];
  locale: string;
};

export async function RelatedProducts({ products, locale }: Props) {
  const t = await getTranslations(locale, 'productDetail');

  if (products.length === 0) return null;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 4, color: 'text.primary', fontSize: { xs: 22, md: 28 } }}>
          {t('related')}
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <ProductCard product={product} locale={locale} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
