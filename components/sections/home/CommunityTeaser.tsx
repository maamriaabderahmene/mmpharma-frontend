import { Container, Typography, Button, Stack, Box } from '@mui/material';
import { palette } from '@/theme/palette';

export function CommunityTeaser() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto', alignItems: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 28, md: 36 },
              color: palette.primary[900],
            }}
          >
            Rejoignez la communauté
          </Typography>
          <Typography variant="body1" sx={{ color: palette.neutral[700], lineHeight: 1.7, mb: 3 }}>
            Échangez avec nos experts et partagez vos expériences.
          </Typography>
          <Button
            component="a"
            href="/community"
            variant="contained"
            color="primary"
            sx={{ fontWeight: 600, borderRadius: 8, px: 4, height: 44 }}
          >
            Poser une question
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
