import Link from 'next/link';
import { Box, Typography, Button, Stack, Grid } from '@mui/material';
import { EventCard } from './EventCard';
import type { Event } from '@/lib/shared/types/Event';

type Props = {
  locale: string;
  filter: string;
};

async function fetchEvents(locale: string, filter: string): Promise<Event[]> {
  try {
    const status = filter === 'past' ? 'past' : 'upcoming';
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events?status=${status}&locale=${locale}`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || data.events || [];
  } catch {
    return [];
  }
}

export async function EventList({ locale, filter }: Props) {
  const events = await fetchEvents(locale, filter);

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
        <Button
          component="a"
          href={`/${locale}/events`}
          variant={filter !== 'past' ? 'contained' : 'outlined'}
          color="primary"
          size="small"
        >
          À venir
        </Button>
        <Button
          component="a"
          href={`/${locale}/events?filter=past`}
          variant={filter === 'past' ? 'contained' : 'outlined'}
          color="primary"
          size="small"
        >
          Passés
        </Button>
      </Stack>

      {events.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', py: 8 }}>
          {filter === 'past' ? 'Aucun événement passé.' : 'Aucun événement à venir pour le moment.'}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
              <EventCard event={event} locale={locale} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
