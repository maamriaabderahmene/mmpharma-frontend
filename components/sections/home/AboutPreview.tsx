import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';
import { palette } from '@/theme/palette';

export function AboutPreview() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: palette.neutral[0] }}>
      <Container maxWidth="lg">
        <Stack
          spacing={6}
          sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              height: { xs: 280, md: 400 },
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'rgba(14, 90, 167, 0.12)',
              background: 'linear-gradient(135deg, rgba(14, 90, 167, 0.08), rgba(22, 163, 122, 0.05))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: palette.neutral[500] }}>
              Image MM Pharma
            </Typography>
          </Box>

          <Stack spacing={3} sx={{ width: { xs: '100%', md: '50%' } }}>
            <Typography
              variant="overline"
              sx={{ color: palette.primary[500], letterSpacing: 3, fontWeight: 600 }}
            >
              À propos
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 26, md: 34 },
                color: palette.primary[900],
                lineHeight: 1.2,
              }}
            >
              L'excellence pharmaceutique au service de l'hygiène professionnelle.
            </Typography>
            <Typography variant="body1" sx={{ color: palette.neutral[700], lineHeight: 1.7 }}>
              Depuis plus de 10 ans, MM Pharma est un acteur Marocain incontournable dans la fabrication de produits d'hygiène, de désinfection et d'entretien. Notre engagement : offrir des solutions conformes aux normes pharmaceutiques les plus strictes.
            </Typography>
            <Button
              component={Link}
              href="/about"
              variant="contained"
              color="primary"
              sx={{ alignSelf: 'flex-start', fontWeight: 600, borderRadius: 28, px: 3 }}
            >
              Notre histoire
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
