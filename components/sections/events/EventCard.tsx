import Link from 'next/link';
import { Box, Typography, Chip, Button, Stack, Card, CardContent } from '@mui/material';
import type { Event } from '@/lib/shared/types/Event';

type Props = {
  event: Event;
  locale: string;
};

const formatLabels: Record<string, string> = {
  online: 'En ligne',
  onsite: 'Présentiel',
  hybrid: 'Hybride',
};

export function EventCard({ event, locale }: Props) {
  const isPast = new Date(event.endDate) < new Date();

  return (
    <Card
      component={Link}
      href={`/${locale}/events/${event.slug}`}
      sx={{
        textDecoration: 'none',
        height: '100%',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': { borderColor: 'primary.main', transform: 'translateY(-4px)' },
      }}
    >
      <Box
        sx={{
          height: 160,
          background: event.heroImage?.url
            ? `url(${event.heroImage.url}) center/cover no-repeat`
            : 'linear-gradient(135deg, rgba(14,90,167,0.12), rgba(242,177,53,0.06))',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          p: 1.5,
        }}
      >
        <Chip
          label={formatLabels[event.format] || event.format}
          size="small"
          sx={{ bgcolor: 'rgba(255,255,255,0.9)', fontWeight: 600 }}
        />
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: 11 }}>
          {new Date(event.startDate).toLocaleDateString('fr-MA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Typography>
        <Typography variant="h6" sx={{ color: 'primary.main', my: 0.5, fontSize: 16, lineHeight: 1.3 }}>
          {event.title}
        </Typography>
        {event.location && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {event.location.city}
            {event.location.country ? `, ${event.location.country}` : ''}
          </Typography>
        )}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {event.registrations}/{event.capacity || '—'} inscrits
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/${locale}/events/${event.slug}`;
            }}
            sx={{ pointerEvents: 'auto' }}
          >
            {isPast ? 'Voir' : "S'inscrire"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
