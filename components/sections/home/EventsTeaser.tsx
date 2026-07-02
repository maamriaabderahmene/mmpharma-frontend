import { Container, Typography, Button, Stack, Box } from '@mui/material';
import type { Event } from '@/lib/shared/types/Event';
import { palette } from '@/theme/palette';

type Props = {
  event: Event | null;
};

export function EventsTeaser({ event }: Props) {
  if (!event) return null;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
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
            maxWidth: 560,
            mx: 'auto',
            p: { xs: 4, md: 5 },
            borderRadius: 8,
            border: `1px solid ${palette.neutral[200]}`,
            bgcolor: palette.neutral[0],
            textAlign: 'center',
          }}
        >
          <Typography variant="overline" sx={{ color: palette.primary[500], letterSpacing: 1, fontSize: 12 }}>
            {new Date(event.startDate).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Typography>

          <Typography variant="h5" sx={{ color: palette.primary[900], my: 2, fontWeight: 600 }}>
            {event.title}
          </Typography>

          {event.location && (
            <Typography variant="body2" sx={{ color: palette.neutral[700], mb: 3 }}>
              📍 {event.location.city}, {event.location.country}
            </Typography>
          )}

          <Button
            component="a"
            href={`/events/${event.slug}`}
            variant="contained"
            color="primary"
            sx={{ fontWeight: 600, borderRadius: 8, px: 4, height: 44 }}
          >
            S&apos;inscrire
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
