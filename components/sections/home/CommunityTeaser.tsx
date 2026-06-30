import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';
import { palette } from '@/theme/palette';

export function CommunityTeaser() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: palette.neutral[0] }}>
      <Container maxWidth="lg">
        <Stack spacing={3} sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto', alignItems: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 28, md: 36 },
              color: palette.primary[900],
            }}
          >
            Rejoignez la communauté
          </Typography>
          <Typography variant="body1" sx={{ color: palette.neutral[700], lineHeight: 1.7 }}>
            Échangez avec nos experts et partagez vos expériences.
          </Typography>
          <Button
            component={Link}
            href="/community"
            variant="contained"
            color="primary"
            sx={{ fontWeight: 600, borderRadius: 28, px: 4 }}
          >
            Poser une question
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
