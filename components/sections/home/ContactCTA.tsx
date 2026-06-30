import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';
import { palette } from '@/theme/palette';

export function ContactCTA() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: palette.primary[500],
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 28, md: 36 },
              color: palette.neutral[0],
            }}
          >
            Un projet ? Une question ?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: 500, lineHeight: 1.7 }}
          >
            Notre équipe est à votre écoute pour vous accompagner.
          </Typography>
          <Stack spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              sx={{
                bgcolor: palette.neutral[0],
                color: palette.primary[900],
                fontWeight: 600,
                borderRadius: 28,
                px: 4,
                '&:hover': { bgcolor: palette.neutral[100] },
              }}
            >
              Nous contacter
            </Button>
            <Button
              component={Link}
              href="/contact?intent=quote"
              variant="outlined"
              sx={{
                borderColor: palette.neutral[0],
                color: palette.neutral[0],
                fontWeight: 600,
                borderRadius: 28,
                px: 4,
                '&:hover': {
                  borderColor: palette.neutral[0],
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Demander un devis
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
