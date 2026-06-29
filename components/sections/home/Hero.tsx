import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';

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
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 168, 83, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(0, 212, 255, 0.08), transparent),
            radial-gradient(ellipse 50% 60% at 0% 80%, rgba(245, 158, 11, 0.06), transparent)
          `,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 12, md: 16 } }}>
        <Stack spacing={3} sx={{ maxWidth: 720 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              letterSpacing: 4,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            PHARMACEUTIQUE · MAROC
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 32, md: 52, lg: 64 },
              lineHeight: 1.1,
              color: 'primary.main',
            }}
          >
            L'hygiène et la désinfection, par la science.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: 16, md: 18 },
              maxWidth: 600,
              lineHeight: 1.7,
            }}
          >
            MM Pharma conçoit, fabrique et distribue une gamme complète de produits d'hygiène, de désinfection et d'entretien pour les professionnels de santé, l'hôtellerie, l'industrie et les collectivités.
          </Typography>

          <Stack spacing={2} sx={{ pt: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              color="primary"
              size="large"
            >
              Découvrir nos produits
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              color="primary"
              size="large"
            >
              Demander un devis
            </Button>
          </Stack>

          <Stack direction="row" spacing={4} sx={{ pt: 4, flexWrap: 'wrap' }}>
            {trustPills.map((pill) => (
              <Stack key={pill} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Box
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
                <Typography variant="caption" sx={{ color: 'neutral.400' }}>
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
