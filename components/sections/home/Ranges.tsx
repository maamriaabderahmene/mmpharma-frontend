import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import Link from 'next/link';
import { palette } from '@/theme/palette';

const ranges = [
  { id: 'hygiene', name: 'Hygiène', description: 'Savons, gels et solutions hydroalcooliques pour les soins et la prophylaxie.', count: 8 },
  { id: 'detergent', name: 'Détergents', description: 'Nettoyants puissants pour les surfaces, les sols et le linge.', count: 7 },
  { id: 'disinfectant', name: 'Désinfectants', description: 'Solutions bactéricides, virucides et fongicides à large spectre.', count: 10 },
  { id: 'inox', name: 'Inox', description: "Produits dédiés à l'entretien et à la protection des surfaces inox.", count: 4 },
  { id: 'misc', name: 'Divers', description: 'Accessoires et consommables complémentaires pour professionnels.', count: 3 },
] as const;

export function Ranges() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: palette.neutral[0] }}>
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
          Nos 5 gammes
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {ranges.map((range) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={range.id}>
              <Card
                component={Link}
                href={`/products?range=${range.id}`}
                sx={{
                  textDecoration: 'none',
                  height: '100%',
                  transition: 'all 150ms ease',
                  cursor: 'pointer',
                  borderRadius: 12,
                  '&:hover': {
                    borderColor: palette.primary[500],
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: palette.primary[900],
                      mb: 1.5,
                      fontSize: { xs: 18, md: 20 },
                    }}
                  >
                    {range.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: palette.neutral[700], mb: 2, lineHeight: 1.6 }}
                  >
                    {range.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.neutral[500] }}>
                    {range.count} produits
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
