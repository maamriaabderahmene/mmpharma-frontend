import type { Metadata } from 'next';
import { Container, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { EventList } from '@/components/sections/events/EventList';
import { buildPageMetadata } from '@/lib/seo/metadata';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    section: 'events',
    path: '/events',
    title: 'Événements',
    description: 'Webinars, conférences et ateliers — expertise en hygiène et désinfection.',
  });
}

export default async function EventsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { filter } = await searchParams;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: 32, md: 48 }, color: 'primary.main', mb: 2 }}
        >
          Événements
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 600 }}>
          Webinars, conférences et ateliers pour approfondir vos connaissances.
        </Typography>
        <EventList locale={locale} filter={filter || 'upcoming'} />
      </Container>
    </Box>
  );
}
