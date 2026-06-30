import type { Metadata } from 'next';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { palette } from '@/theme/palette';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'À propos',
    description: "MM Pharma — fabricant de produits d'hygiène et de désinfection au ALGERIA.",
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/about` },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Box component="section" sx={{ py: { xs: 8, md: 16 } }}>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: palette.primary[500], letterSpacing: 3, mb: 2, display: 'block' }}>
            À PROPOS
          </Typography>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: 32, md: 48 }, color: palette.primary[900], mb: 4, lineHeight: 1.1 }}
          >
            L'excellence pharmaceutique au service de l'hygiène professionnelle.
          </Typography>
          <Typography variant="body1" sx={{ color: palette.neutral[700], lineHeight: 1.8, fontSize: 16, mb: 3 }}>
            MM Pharma est un fabricant ALGERIAain spécialisé dans la conception, la fabrication et la distribution
            de produits d'hygiène, de désinfection et d'entretien. Nous accompagnons les professionnels de santé,
            l'hôtellerie, l'industrie et les collectivités depuis plus de 15 ans.
          </Typography>
          <Typography variant="body1" sx={{ color: palette.neutral[700], lineHeight: 1.8, fontSize: 16 }}>
            Notre engagement : offrir des solutions conformes aux normes pharmaceutiques les plus exigeantes,
            avec un contrôle qualité rigoureux sur chaque lot produit.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: palette.neutral[0] }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: 28, md: 36 }, color: palette.primary[900], textAlign: 'center', mb: 8 }}
          >
            Nos valeurs
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: 'Qualité', body: 'Chaque lot est soumis à des contrôles microbiologiques et physico-chimiques rigoureux.' },
              { title: 'Innovation', body: "Nous investissons dans la R&D pour développer des formulations toujours plus performantes." },
              { title: 'Engagement', body: 'Certifiés ISO 9001, nous respectons les normes les plus strictes de l\'industrie pharmaceutique.' },
              { title: 'Proximité', body: 'Fabrication locale au ALGERIA pour un service réactif et une empreinte carbone réduite.' },
            ].map((value) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={value.title}>
                <Card sx={{ height: '100%', textAlign: 'center', borderRadius: 12 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ color: palette.primary[900], mb: 1.5 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: palette.neutral[700], lineHeight: 1.7 }}>
                      {value.body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 36 }, color: palette.primary[900], textAlign: 'center', mb: 3 }}>
            Notre équipe
          </Typography>
          <Typography variant="body1" sx={{ color: palette.neutral[700], textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}>
            Une équipe passionnée au service de votre santé et de votre environnement professionnel.
          </Typography>
          <Typography variant="body2" sx={{ color: palette.neutral[500], textAlign: 'center' }}>
            Photos et biographies à venir.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: palette.primary[500] }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 36 }, color: palette.neutral[0], mb: 3 }}>
            Un engagement qualité irréprochable
          </Typography>
          <Typography variant="body1" sx={{ color: palette.neutral[0], mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
            De la sélection des matières premières jusqu'à la livraison, chaque étape est contrôlée
            pour garantir des produits sûrs, efficaces et conformes.
          </Typography>
        </Container>
      </Box>
    </>
  );
}