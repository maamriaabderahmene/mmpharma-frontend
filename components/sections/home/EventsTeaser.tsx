import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';
import type { Event } from '@/lib/shared/types/Event';
import { palette } from '@/theme/palette';

type Props = {
  event: Event | null;
};

export function EventsTeaser({ event }: Props) {
  if (!event) return null;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: palette.neutral[0] }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontSize: { xs: 28, md: 36 },
            color: palette.primary[900],
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
            borderColor: 'rgba(14, 90, 167, 0.15)',
            background: palette.neutral[0],
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(15, 22, 32, 0.04)',
          }}
        >
          <Typography variant="overline" sx={{ color: palette.primary[500], letterSpacing: 2 }}>
            {new Date(event.startDate).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Typography>

          <Typography variant="h4" sx={{ color: palette.primary[900], my: 2, fontWeight: 600 }}>
            {event.title}
          </Typography>

          {event.location && (
            <Typography variant="body2" sx={{ color: palette.neutral[700], mb: 3 }}>
              📍 {event.location.city}, {event.location.country}
            </Typography>
          )}

          <Button
            component={Link}
            href={`/events/${event.slug}`}
            variant="contained"
            color="primary"
            sx={{ fontWeight: 600, borderRadius: 28, px: 4 }}
          >
            S'inscrire
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
