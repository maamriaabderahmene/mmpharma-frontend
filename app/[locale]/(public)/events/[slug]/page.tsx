import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Typography, Box, Chip, Button, Stack, Grid, Avatar, Divider } from '@mui/material';
import Link from 'next/link';
import type { Event, EventSession } from '@/lib/shared/types/Event';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function fetchEvent(slug: string, locale: string): Promise<Event | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}?locale=${locale}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = await fetchEvent(slug, locale);
  if (!event) return { title: 'Événement non trouvé' };

  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/events/${slug}` },
  };
}

const formatLabels: Record<string, string> = {
  online: 'En ligne',
  onsite: 'Présentiel',
  hybrid: 'Hybride',
};

export default async function EventDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const event = await fetchEvent(slug, locale);

  if (!event) notFound();

  const isPast = new Date(event.endDate) < new Date();
  const isFull = event.capacity ? event.registrations >= event.capacity : false;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Link href={`/${locale}/events`} style={{ color: 'inherit', textDecoration: 'underline', fontSize: 14 }}>
        ← Tous les événements
      </Link>

      <Box sx={{ mt: 3, mb: 4 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={formatLabels[event.format] || event.format} size="small" color="primary" variant="outlined" />
          {isPast && <Chip label="Passé" size="small" color="default" />}
        </Stack>

        <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 40 }, color: 'primary.main', mb: 1 }}>
          {event.title}
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
          {event.description}
        </Typography>

        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="body2">
            <strong>Date :</strong>{' '}
            {new Date(event.startDate).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' — '}
            {new Date(event.endDate).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Typography>
          {event.location && (
            <Typography variant="body2">
              <strong>Lieu :</strong> {event.location.name}, {event.location.address}, {event.location.city}
              {event.location.country ? `, ${event.location.country}` : ''}
            </Typography>
          )}
          <Typography variant="body2">
            <strong>Inscrits :</strong> {event.registrations}{event.capacity ? ` / ${event.capacity}` : ''}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={isPast || isFull}
          component={Link as unknown as React.ElementType}
          href={isPast ? '#' : `/${locale}/events/${slug}/register`}
        >
          {isPast ? 'Événement terminé' : isFull ? 'Complet' : "S'inscrire"}
        </Button>
      </Box>

      {event.sessions && event.sessions.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: 22, md: 28 }, color: 'primary.main', mb: 3 }}>
            Programme
          </Typography>
          <Stack spacing={2}>
            {event.sessions.map((session, i) => (
              <Box
                key={i}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="overline" sx={{ color: 'primary.main' }}>
                  {new Date(session.startTime).toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' })}
                  {' — '}
                  {new Date(session.endTime).toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main', mt: 0.5 }}>
                  {session.title}
                </Typography>
                {session.speaker && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5 }}>
                    {session.speaker}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {session.description}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {event.location && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: 22, md: 28 }, color: 'primary.main', mb: 3 }}>
            Accès
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 300,
              borderRadius: 2,
              bgcolor: 'neutral.100',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Carte — {event.location.name}, {event.location.city}
            </Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
}
