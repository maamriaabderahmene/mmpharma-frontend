import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';

export function ContactCTA() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'primary.500',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 28, md: 36 },
              color: 'deepNavy',
            }}
          >
            Un projet ? Une question ?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(10, 10, 26, 0.7)', maxWidth: 500, lineHeight: 1.7 }}
          >
            Notre équipe est à votre écoute pour vous accompagner.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              sx={{
                bgcolor: 'deepNavy',
                color: 'white',
                '&:hover': { bgcolor: '#1a1a3a' },
              }}
            >
              Nous contacter
            </Button>
            <Button
              component={Link}
              href="/contact?intent=quote"
              variant="outlined"
              sx={{
                borderColor: 'deepNavy',
                color: 'deepNavy',
                '&:hover': {
                  borderColor: 'deepNavy',
                  bgcolor: 'rgba(10, 10, 26, 0.08)',
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
