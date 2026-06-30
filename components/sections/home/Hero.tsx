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
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(14, 90, 167, 0.12), transparent),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(22, 163, 122, 0.08), transparent),
            radial-gradient(ellipse 50% 60% at 0% 80%, rgba(242, 177, 53, 0.06), transparent)
          `,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg opacity="0.03"%3E%3Cpath d="M0 0h60v60H0z" fill="none" stroke="%230E5AA7" stroke-width="1"/%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 12, md: 16 } }}>
        <Stack spacing={3} sx={{ maxWidth: 720 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 1,
              borderRadius: 20,
              bgcolor: 'rgba(242, 177, 53, 0.12)',
              border: '1px solid rgba(242, 177, 53, 0.3)',
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: palette.accent[500],
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                },
              }}
            />
            <Typography
              variant="overline"
              sx={{
                color: palette.accent[500],
                letterSpacing: 4,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              PHARMACEUTIQUE · ALGERIA
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

          <Stack spacing={2} sx={{ pt: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                fontWeight: 600,
                borderRadius: 28,
                transition: 'all 200ms cubic-bezier(0.2, 0, 0, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px -6px rgba(14, 90, 167, 0.2)',
                },
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
                borderRadius: 28,
                borderWidth: 2,
                transition: 'all 200ms cubic-bezier(0.2, 0, 0, 1)',
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: 'transparent',
                },
              }}
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
                    bgcolor: palette.primary[500],
                  }}
                />
                <Typography variant="caption" sx={{ color: palette.neutral[500], fontWeight: 500 }}>
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
