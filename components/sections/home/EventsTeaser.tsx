import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';
import type { Event } from '@/lib/shared/types/Event';

type Props = {
  event: Event | null;
};

export function EventsTeaser({ event }: Props) {
  if (!event) return null;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontSize: { xs: 28, md: 36 },
            color: 'primary.main',
          }}
        >
          Prochain événement
        </Typography>

        <Box
          sx={{
            maxWidth: 640,
            mx: 'auto',
            p: { xs: 4, md: 6 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'rgba(212, 168, 83, 0.2)',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            textAlign: 'center',
          }}
        >
          <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 2 }}>
            {new Date(event.startDate).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Typography>

          <Typography variant="h4" sx={{ color: 'white', my: 2, fontWeight: 600 }}>
            {event.title}
          </Typography>

          {event.location && (
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              📍 {event.location.city}, {event.location.country}
            </Typography>
          )}

          <Button
            component={Link}
            href={`/events/${event.slug}`}
            variant="contained"
            color="primary"
          >
            S'inscrire
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
