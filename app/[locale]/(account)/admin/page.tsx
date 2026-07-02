import type { Metadata } from 'next';
import { Container, Typography, Grid, Card, CardContent, Stack, Chip, Button } from '@mui/material';

type Props = {
  params: Promise<{ locale: string }>;
};

const TITLES: Record<string, string> = {
  'fr-MA': 'Admin — Tableau de pilotage',
  'ar-MA': 'المسؤول — لوحة القيادة',
  'en-US': 'Admin — Operations cockpit',
};

const SUBTITLES: Record<string, string> = {
  'fr-MA': 'Pilotez le catalogue, les contenus et la qualité des opérations depuis un espace central.',
  'ar-MA': 'قم بإدارة الكتالوج والمحتوى وجودة العمليات من مساحة مركزية واحدة.',
  'en-US': 'Manage catalog, content, and operational quality from one central control surface.',
};

const CARDS = [
  { key: 'catalog', label: 'Catalogue', status: 'Ready', description: 'Validation produits, enrichissement fiches, visibilité des ruptures.' },
  { key: 'orders', label: 'Commandes', status: 'In progress', description: 'Vue consolidée des flux de commandes et priorisation des anomalies.' },
  { key: 'content', label: 'Contenu', status: 'Ready', description: 'Pilotage blog, événements, SEO caché et conformité éditoriale.' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: TITLES[locale] ?? TITLES['en-US'],
    description: SUBTITLES[locale] ?? SUBTITLES['en-US'],
  };
}

export default async function AdminDashboardPage({ params }: Props) {
  const { locale } = await params;

  return (
    <Container maxWidth="xl">
      <Stack spacing={3} sx={{ mb: 5 }}>
        <Typography variant="h1" sx={{ fontSize: { xs: 30, md: 44 }, color: 'primary.main', letterSpacing: '-0.02em' }}>
          {TITLES[locale] ?? TITLES['en-US']}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 760 }}>
          {SUBTITLES[locale] ?? SUBTITLES['en-US']}
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {CARDS.map((card) => (
          <Grid key={card.key} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 3, border: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" sx={{ color: 'primary.main' }}>
                    {card.label}
                  </Typography>
                  <Chip size="small" label={card.status} color={card.status === 'Ready' ? 'success' : 'warning'} />
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  {card.description}
                </Typography>
                <Button variant="outlined" color="primary">
                  Open module
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
