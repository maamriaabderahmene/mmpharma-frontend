'use client';

import { Container, Typography, Grid, Card, CardContent, Avatar, Stack, Box } from '@mui/material';
import { palette } from '@/theme/palette';

const testimonials = [
  {
    name: 'Dr. Fatima Zohra',
    role: 'Directrice, Clinique Atlas',
    quote: "Les solutions de MM Pharma nous accompagnent au quotidien. Leur qualité pharmaceutique est irréprochable et la livraison est toujours fiable.",
  },
  {
    name: 'Karim Benjelloun',
    role: 'Responsable Achats, Groupe Hôtelier',
    quote: "Un partenaire de confiance pour l'hygiène de nos établissements. La gamme est complète et le rapport qualité-prix est excellent.",
  },
  {
    name: 'Nadia El Fassi',
    role: 'Pharmacienne, Officine',
    quote: "Je recommande MM Pharma à mes patients pour leurs besoins en hygiène et désinfection. Des produits fabriqués au Maroc d'une qualité exceptionnelle.",
  },
] as const;

export function Testimonials() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 5,
            fontSize: { xs: 28, md: 36 },
            color: palette.primary[900],
          }}
        >
          Ils nous font confiance
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {testimonials.map((t) => (
            <Grid size={{ xs: 12, md: 4 }} key={t.name}>
              <Card sx={{ height: '100%', p: { xs: 3, md: 4 }, borderRadius: 12 }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: palette.neutral[700],
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      mb: 2,
                    }}
                  >
                    " {t.quote} "
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: palette.primary[500], color: palette.neutral[0] }}>
                      {t.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ color: palette.primary[900], fontWeight: 600, fontSize: 14 }}>
                        {t.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: palette.neutral[500], fontSize: 12 }}>
                        {t.role}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
