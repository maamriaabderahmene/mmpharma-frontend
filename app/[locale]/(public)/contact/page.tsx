import type { Metadata } from 'next';
import { Container, Typography, Box, Grid, Card, CardContent, Stack, TextField, Button } from '@mui/material';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Contact',
    description: 'Contactez MM Pharma — devis, information, support.',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: 32, md: 48 }, color: 'primary.main', mb: 2 }}
        >
          Contact
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 8, maxWidth: 500 }}>
          Une question, un projet, une demande de devis ? Notre équipe est à votre écoute.
        </Typography>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="h5" sx={{ color: 'primary.main', mb: 4 }}>
                  Envoyez-nous un message
                </Typography>
                <Stack spacing={2.5} component="form" noValidate>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Prénom" required fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Nom" required fullWidth />
                    </Grid>
                  </Grid>
                  <TextField label="Email" type="email" required fullWidth />
                  <TextField label="Société" fullWidth />
                  <TextField label="Téléphone" type="tel" fullWidth />
                  <TextField label="Sujet" required fullWidth />
                  <TextField label="Message" multiline rows={5} required fullWidth />
                  <Button variant="contained" color="primary" size="large" type="submit">
                    Envoyer
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 1 }}>
                    Adresse
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    MM Pharma
                    <br />
                    Casablanca, ALGERIA
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 1 }}>
                    Téléphone
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    +212 5XX XX XX XX
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 1 }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    contact@mmpharma.ma
                  </Typography>
                </CardContent>
              </Card>
              <Box
                sx={{
                  width: '100%',
                  height: 240,
                  borderRadius: 2,
                  bgcolor: 'neutral.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Carte — Casablanca, ALGERIA
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
