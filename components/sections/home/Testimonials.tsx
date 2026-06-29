'use client';

import { Container, Typography, Grid, Card, CardContent, Avatar, Stack, Box } from '@mui/material';

const testimonials = [
  {
    name: 'Dr. Fatima Zohra',
    role: 'Directrice, Clinique Atlas',
    quote: 'Les solutions de MM Pharma nous accompagnent au quotidien. Leur qualité pharmaceutique est irréprochable et la livraison est toujours fiable.',
  },
  {
    name: 'Karim Benjelloun',
    role: 'Responsable Achats, Groupe Hôtelier',
    quote: 'Un partenaire de confiance pour l\'hygiène de nos établissements. La gamme est complète et le rapport qualité-prix est excellent.',
  },
  {
    name: 'Nadia El Fassi',
    role: 'Pharmacienne, Officine',
    quote: 'Je recommande MM Pharma à mes patients pour leurs besoins en hygiène et désinfection. Des produits fabriqués au Maroc d\'une qualité exceptionnelle.',
  },
];

export function Testimonials() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: 28, md: 36 },
            color: 'primary.main',
          }}
        >
          Ils nous font confiance
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((t) => (
            <Grid size={{ xs: 12, md: 4 }} key={t.name}>
              <Card sx={{ height: '100%', p: 2 }}>
                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      mb: 3,
                      '&::before': { content: '"\u201C"' },
                      '&::after': { content: '"\u201D"' },
                    }}
                  >
                    {' '}{t.quote}
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'deepNavy' }}>
                      {t.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                        {t.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'neutral.500' }}>
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
