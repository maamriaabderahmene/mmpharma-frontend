import type { Metadata } from 'next';
import { Container, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import { ROUTES } from '@/lib/shared/routes';

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
    { label: 'Commandes', value: '—', href: ROUTES.myOrders(locale), tag: 'Suivi' },
    { label: 'Articles', value: '—', href: ROUTES.myArticles(locale), tag: 'Édition' },
    { label: 'Commentaires', value: '—', href: ROUTES.myComments(locale), tag: 'Modération' },
    { label: 'Admin', value: '→', href: ROUTES.admin(locale), tag: 'Pilotage' },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" sx={{ fontSize: { xs: 30, md: 44 }, color: 'primary.main', mb: 1, letterSpacing: '-0.02em' }}>
        Tableau de bord
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, maxWidth: 700 }}>
        Bienvenue sur votre cockpit personnel. Suivez vos commandes, vos contenus et vos interactions depuis un espace unifié.
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
            <Card
              component="a"
              href={stat.href}
              sx={{
                textDecoration: 'none',
                display: 'block',
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
                transition: 'all .24s ease',
                '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)', boxShadow: 2 },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {stat.label}
                  </Typography>
                  <Chip size="small" label={stat.tag} color="info" />
                </Stack>
                <Typography variant="h3" sx={{ color: 'primary.main', mb: 1.5, fontWeight: 700 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Ouvrir le module {stat.label.toLowerCase()}.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
