import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';

export function CommunityTeaser() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3} textAlign="center" maxWidth={600} mx="auto" sx={{ alignItems: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 28, md: 36 },
              color: 'primary.main',
            }}
          >
            Rejoignez la communauté
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            Échangez avec nos experts et partagez vos expériences.
          </Typography>
          <Button
            component={Link}
            href="/community"
            variant="contained"
            color="primary"
          >
            Poser une question
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
