import { Container, Typography, Grid, Card, CardContent, Stack, Box } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import VerifiedIcon from '@mui/icons-material/Verified';
import FactoryIcon from '@mui/icons-material/Factory';
import { palette } from '@/theme/palette';

const pillars = [
  {
    icon: <ScienceIcon sx={{ fontSize: 48, color: palette.primary[500] }} />,
    heading: 'Contrôle microbiologique',
    description: "Chaque lot est analysé en laboratoire pour garantir l'absence de germes pathogènes, levures et moisissures.",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 48, color: palette.secondary[500] }} />,
    heading: 'Conformité réglementaire',
    description: 'Tous nos produits respectent le Journal Officiel n°16 2020 et les normes pharmaceutiques marocaines en vigueur.',
  },
  {
    icon: <FactoryIcon sx={{ fontSize: 48, color: palette.accent[500] }} />,
    heading: 'Fabrication locale',
    description: 'Produits conçus et fabriqués dans notre unité de production au Maroc, avec un contrôle qualité rigoureux à chaque étape.',
  },
] as const;

export function Quality() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: palette.neutral[0] }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: 28, md: 36 },
            color: palette.primary[900],
          }}
        >
          Une qualité pharmaceutique, lot après lot.
        </Typography>

        <Grid container spacing={4}>
          {pillars.map((pillar) => (
            <Grid size={{ xs: 12, md: 4 }} key={pillar.heading}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 4, borderRadius: 12 }}>
                <CardContent>
                  <Box sx={{ mb: 3 }}>{pillar.icon}</Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: palette.primary[900],
                      mb: 1.5,
                      fontSize: { xs: 18, md: 20 },
                    }}
                  >
                    {pillar.heading}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: palette.neutral[700], lineHeight: 1.7 }}
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
