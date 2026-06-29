'use client';

import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import Link from 'next/link';
import type { Product } from '@/lib/shared/types/Product';

type Props = {
  products: Product[];
};

export function FeaturedProducts({ products }: Props) {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, flexWrap: 'wrap', gap: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 28, md: 36 },
              color: 'primary.main',
            }}
          >
            Produits phares
          </Typography>
          <Button
            component={Link}
            href="/products"
            variant="outlined"
            color="primary"
          >
            Voir tout le catalogue
          </Button>
        </Box>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <Card
                component={Link}
                href={`/products/${product.slug}`}
                sx={{
                  textDecoration: 'none',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(212, 168, 83, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="overline"
                    sx={{ color: 'neutral.500', letterSpacing: 1, fontSize: 11 }}
                  >
                    {product.range}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'primary.main',
                      mb: 1,
                      fontSize: { xs: 18, md: 20 },
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
