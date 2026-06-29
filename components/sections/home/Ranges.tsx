import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import Link from 'next/link';

const ranges = [
  { id: 'hygiene', name: 'Hygiène', description: 'Savons, gels et solutions hydroalcooliques pour les soins et la prophylaxie.', count: 8 },
  { id: 'detergent', name: 'Détergents', description: 'Nettoyants puissants pour les surfaces, les sols et le linge.', count: 7 },
  { id: 'disinfectant', name: 'Désinfectants', description: 'Solutions bactéricides, virucides et fongicides à large spectre.', count: 10 },
  { id: 'inox', name: 'Inox', description: 'Produits dédiés à l\'entretien et à la protection des surfaces inox.', count: 4 },
  { id: 'misc', name: 'Divers', description: 'Accessoires et consommables complémentaires pour professionnels.', count: 3 },
];

export function Ranges() {
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
          Nos 5 gammes
        </Typography>

        <Grid container spacing={3}>
          {ranges.map((range) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={range.id}>
              <Card
                component={Link}
                href={`/products?range=${range.id}`}
                sx={{
                  textDecoration: 'none',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(212, 168, 83, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'primary.main',
                      mb: 1.5,
                      fontSize: { xs: 20, md: 22 },
                    }}
                  >
                    {range.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}
                  >
                    {range.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'neutral.500' }}
                  >
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
