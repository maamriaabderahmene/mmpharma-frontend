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
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: palette.neutral[0] }}>
      <Container maxWidth="lg">
        <Stack
          spacing={{ xs: 4, sm: 2 }}
          divider={<Box sx={{ width: 1, height: 32, borderRight: '1px solid', borderColor: 'rgba(14, 90, 167, 0.15)' }} />}
          sx={{ flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-around', alignItems: 'center' }}
        >
          {stats.map((stat) => (
            <Stack key={stat.label} spacing={0.5} sx={{ alignItems: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: 36, md: 48 },
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${palette.primary[500]}, ${palette.accent[500]})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
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
