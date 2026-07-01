import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';
import { palette } from '@/theme/palette';

const trustPills = [
  'Certifié ISO 9001',
  'Agréé par le ministère de la Santé',
];

export function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '90vh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: palette.neutral[50],
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={3} sx={{ maxWidth: 720 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              px: 3,
              py: 1,
              borderRadius: 20,
              bgcolor: `${palette.primary[500]}10`,
              border: `1px solid ${palette.primary[200]}`,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: palette.primary[500],
                flexShrink: 0,
              }}
            />
            <Typography
              variant="overline"
              sx={{
                color: palette.primary[500],
                letterSpacing: 2,
                fontWeight: 600,
                fontSize: 11,
              }}
            >
              PHARMACEUTIQUE · MAROC
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 32, md: 52, lg: 64 },
              lineHeight: 1.1,
              color: palette.primary[900],
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            L'hygiène et la désinfection, par la science.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: palette.neutral[700],
              fontSize: { xs: 16, md: 18 },
              maxWidth: 600,
              lineHeight: 1.7,
            }}
          >
            MM Pharma conçoit, fabrique et distribue une gamme complète de produits d'hygiène, de désinfection et d'entretien pour les professionnels de santé, l'hôtellerie, l'industrie et les collectivités.
          </Typography>

          <Stack spacing={2} sx={{ pt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                fontWeight: 600,
                borderRadius: 8,
                minWidth: 144,
                height: 52,
              }}
            >
              Découvrir nos produits
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                px: 4,
                fontWeight: 600,
                borderRadius: 8,
                minWidth: 144,
                height: 52,
              }}
            >
              Demander un devis
            </Button>
          </Stack>

          <Stack direction="row" spacing={3} sx={{ pt: 5, flexWrap: 'wrap' }}>
            {trustPills.map((pill) => (
              <Stack key={pill} direction="row" spacing={1} sx={{ alignItems: 'center', height: 44 }}>
                <Box
                  component="span"
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: palette.primary[500],
                  }}
                />
                <Typography variant="caption" sx={{ color: palette.neutral[500], fontSize: 12 }}>
                  {pill}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
