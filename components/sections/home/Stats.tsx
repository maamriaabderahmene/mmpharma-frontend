import { Container, Typography, Stack, Box } from '@mui/material';

const stats = [
  { value: '32+', label: 'Produits' },
  { value: '5', label: 'Gammes' },
  { value: '10+', label: `Années d'expertise` },
  { value: '100%', label: 'Conforme JO N°16 2020' },
];

export function Stats() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 4, sm: 2 }}
          justifyContent="space-around"
          alignItems="center"
          divider={<Box sx={{ width: 1, height: 32, borderRight: '1px solid', borderColor: 'rgba(212, 168, 83, 0.15)' }} />}
        >
          {stats.map((stat) => (
            <Stack key={stat.label} spacing={0.5} alignItems="center">
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: 36, md: 48 },
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #d4a853, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                {stat.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
