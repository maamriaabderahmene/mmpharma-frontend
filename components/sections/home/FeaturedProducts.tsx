'use client';

import { Container, Typography, Grid, Button, Box, Stack, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Product } from '@/lib/shared/types/Product';
import { palette } from '@/theme/palette';

type Props = { products: Product[] };

const RANGE_LABELS: Record<string, string> = {
  hygiene: 'Gamme I',
  detergent: 'Gamme II',
  disinfectant: 'Gamme III',
  inox: 'Gamme IV',
  misc: 'Gamme V',
};

export function FeaturedProducts({ products }: Props) {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: palette.neutral[0] }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: { xs: 6, md: 10 }, flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ maxWidth: 720 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
              <Box sx={{ width: 32, height: '1px', bgcolor: palette.accent[700] }} />
              <Typography sx={{ fontSize: 11, letterSpacing: '0.28em', color: palette.accent[700], fontWeight: 600 }}>
                SÉLECTION — PRODUITS PHARES
              </Typography>
            </Stack>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 36, md: 56 },
                lineHeight: 1,
                letterSpacing: '-0.03em',
                fontWeight: 500,
                color: palette.primary[900],
              }}
            >
              Références plébiscitées par les professionnels.
            </Typography>
          </Box>
          <Button
            component="a"
            href="/products"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 3,
              height: 48,
              borderRadius: 0,
              border: `1px solid ${palette.primary[900]}`,
              color: palette.primary[900],
              fontWeight: 600,
              letterSpacing: '0.04em',
              '&:hover': { bgcolor: palette.primary[900], color: palette.neutral[0] },
            }}
          >
            Catalogue complet
          </Button>
        </Box>

        <Grid container spacing={0} sx={{ borderTop: `1px solid ${palette.neutral[200]}`, borderLeft: `1px solid ${palette.neutral[200]}` }}>
          {products.map((product, i) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={product.id}>
              <Box
                component="a"
                href={`/products/${product.slug}`}
                sx={{
                  display: 'block',
                  height: '100%',
                  p: { xs: 4, md: 5 },
                  borderRight: `1px solid ${palette.neutral[200]}`,
                  borderBottom: `1px solid ${palette.neutral[200]}`,
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative',
                  transition: 'all 300ms cubic-bezier(0.2, 0, 0, 1)',
                  '&:hover': {
                    bgcolor: palette.neutral[50],
                    '& .featured-arrow': { transform: 'translate(4px, -4px)', color: palette.accent[700] },
                    '& .featured-title': { color: palette.primary[500] },
                  },
                }}
              >
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 6 }}>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={RANGE_LABELS[product.range] ?? product.range}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: 10,
                        borderRadius: 0,
                        bgcolor: 'transparent',
                        border: `1px solid ${palette.primary[900]}`,
                        color: palette.primary[900],
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                      }}
                    />
                    {product.code && (
                      <Typography
                        sx={{
                          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                          fontSize: 10,
                          letterSpacing: '0.08em',
                          color: palette.neutral[500],
                          alignSelf: 'center',
                        }}
                      >
                        {product.code}
                      </Typography>
                    )}
                  </Stack>
                  <Box
                    className="featured-arrow"
                    sx={{
                      color: palette.neutral[500],
                      transition: 'all 300ms',
                      transform: 'rotate(-45deg)',
                    }}
                  >
                    <ArrowForwardIcon fontSize="small" />
                  </Box>
                </Stack>

                <Typography
                  sx={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    color: palette.accent[700],
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  className="featured-title"
                  sx={{
                    fontSize: { xs: 22, md: 26 },
                    fontWeight: 500,
                    lineHeight: 1.15,
                    letterSpacing: '-0.015em',
                    color: palette.primary[900],
                    mb: 2,
                    transition: 'color 300ms',
                    minHeight: { md: 88 },
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  sx={{
                    color: palette.neutral[700],
                    fontSize: 13,
                    lineHeight: 1.65,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {product.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}