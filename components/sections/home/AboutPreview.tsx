import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';

export function AboutPreview() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
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
              borderColor: 'rgba(212, 168, 83, 0.15)',
              background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.1), rgba(0, 212, 255, 0.05))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: 'neutral.500' }}>
              Image MM Pharma
            </Typography>
          </Box>

          <Stack spacing={3} sx={{ width: { xs: '100%', md: '50%' } }}>
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', letterSpacing: 3, fontWeight: 600 }}
            >
              À propos
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 26, md: 34 },
                color: 'primary.main',
                lineHeight: 1.2,
              }}
            >
              L'excellence pharmaceutique au service de l'hygiène professionnelle.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              Depuis plus de 10 ans, MM Pharma est un acteur marocain incontournable dans la fabrication de produits d'hygiène, de désinfection et d'entretien. Notre engagement : offrir des solutions conformes aux normes pharmaceutiques les plus strictes.
            </Typography>
            <Button
              component={Link}
              href="/about"
              variant="contained"
              color="primary"
              sx={{ alignSelf: 'flex-start' }}
            >
              Notre histoire
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
