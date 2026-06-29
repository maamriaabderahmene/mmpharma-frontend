import { Container, Typography, Grid, Card, CardContent, Stack, Box } from '@mui/material';

const pillars = [
  {
    icon: '🔬',
    heading: 'Contrôle microbiologique',
    description: 'Chaque lot est analysé en laboratoire pour garantir l\'absence de germes pathogènes, levures et moisissures.',
  },
  {
    icon: '📋',
    heading: 'Conformité réglementaire',
    description: 'Tous nos produits respectent le Journal Officiel n°16 2020 et les normes pharmaceutiques marocaines en vigueur.',
  },
  {
    icon: '🏭',
    heading: 'Fabrication locale',
    description: 'Produits conçus et fabriqués dans notre unité de production au Maroc, avec un contrôle qualité rigoureux à chaque étape.',
  },
];

export function Quality() {
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
          Une qualité pharmaceutique, lot après lot.
        </Typography>

        <Grid container spacing={4}>
          {pillars.map((pillar) => (
            <Grid size={{ xs: 12, md: 4 }} key={pillar.heading}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Typography variant="h3" sx={{ fontSize: 40, mb: 2 }}>
                    {pillar.icon}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'primary.main',
                      mb: 1.5,
                      fontSize: { xs: 18, md: 20 },
                    }}
                  >
                    {pillar.heading}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                  >
                    {pillar.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
