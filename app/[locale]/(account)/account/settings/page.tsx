import type { Metadata } from 'next';
import { Container, Typography, Box, Card, CardContent, Stack, TextField, Button, Divider, Grid } from '@mui/material';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Paramètres',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/account/settings` },
  };
}

export default async function SettingsPage({ params }: Props) {
  const { locale } = await params;

  return (
    <Container maxWidth="md">
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, color: 'primary.main', mb: 6 }}>
        Paramètres
      </Typography>

      <Stack spacing={6}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 3 }}>
              Profil
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Nom complet" defaultValue="" fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Email" type="email" defaultValue="" fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Téléphone" defaultValue="" fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Entreprise" defaultValue="" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button variant="contained" color="primary">
                  Enregistrer
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 3 }}>
              Mot de passe
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Mot de passe actuel" type="password" fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Nouveau mot de passe" type="password" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Confirmer le nouveau mot de passe" type="password" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button variant="contained" color="primary">
                  Mettre à jour
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 3 }}>
              Adresses
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Aucune adresse enregistrée.
            </Typography>
            <Button variant="outlined" color="primary">
              Ajouter une adresse
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
