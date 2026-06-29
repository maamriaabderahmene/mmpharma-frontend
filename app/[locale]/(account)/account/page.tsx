import type { Metadata } from 'next';
import { Container, Typography, Box, Grid, Card, CardContent, Stack, Avatar } from '@mui/material';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Mon compte',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/account` },
  };
}

export default async function AccountDashboardPage({ params }: Props) {
  const { locale } = await params;

  const stats = [
    { label: 'Commandes', value: '—', href: `/${locale}/account/my-orders` },
    { label: 'Articles', value: '—', href: `/${locale}/account/my-articles` },
    { label: 'Commentaires', value: '—', href: `/${locale}/account/comments` },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, color: 'primary.main', mb: 2 }}>
        Tableau de bord
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6 }}>
        Bienvenue sur votre espace personnel.
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
            <Card
              component="a"
              href={stat.href}
              sx={{ textDecoration: 'none', display: 'block', '&:hover': { borderColor: 'primary.main' } }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: 'primary.main', mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
