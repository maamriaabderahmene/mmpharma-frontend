import { Container, Typography, Stack, Box } from '@mui/material';
import { palette } from '@/theme/palette';

const stats = [
  { value: '32+', label: 'Produits' },
  { value: '5', label: 'Gammes' },
  { value: '10+', label: "Années d'expertise" },
  { value: '100%', label: 'Conforme JO N°16 2020' },
] as const;

export function Stats() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: palette.neutral[0] }}>
      <Container maxWidth="lg">
        <Stack
          divider={<Box sx={{ width: 1, height: 28, borderRight: '1px solid', borderColor: palette.neutral[200] }} />}
          sx={{ flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-around', alignItems: 'center', gap: { xs: 4, sm: 2 } }}
        >
          {stats.map((stat) => (
            <Stack key={stat.label} spacing={0.5} sx={{ alignItems: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: 32, md: 42 },
                  fontWeight: 700,
                  color: palette.primary[900],
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: palette.neutral[700], textAlign: 'center' }}>
                {stat.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
