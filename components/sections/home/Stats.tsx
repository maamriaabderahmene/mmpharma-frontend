import { Container, Typography, Box, Grid } from '@mui/material';
import { palette } from '@/theme/palette';

const stats = [
  { n: '01', value: '32', suffix: 'SKU', label: 'Références actives au catalogue' },
  { n: '02', value: '05', suffix: 'GAMMES', label: 'Hygiène · Détergent · Désinfectant · Inox · Divers' },
  { n: '03', value: '10', suffix: 'ANS+', label: 'Années d\u2019expertise en fabrication pharmaceutique' },
  { n: '04', value: '100', suffix: '%', label: 'Conforme JO N°16 · 2020 — testé lot par lot' },
] as const;

export function Stats() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: palette.neutral[0],
        borderTop: `1px solid ${palette.neutral[200]}`,
        borderBottom: `1px solid ${palette.neutral[200]}`,
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          {stats.map((s, i) => (
            <Grid
              size={{ xs: 6, md: 3 }}
              key={s.n}
              sx={{
                px: { xs: 2, md: 4 },
                py: { xs: 4, md: 2 },
                borderRight: {
                  xs: i % 2 === 0 ? `1px solid ${palette.neutral[200]}` : 'none',
                  md: i < 3 ? `1px solid ${palette.neutral[200]}` : 'none',
                },
                borderBottom: { xs: i < 2 ? `1px solid ${palette.neutral[200]}` : 'none', md: 'none' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: '0.24em',
                  color: palette.accent[700],
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {s.n} / 04
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
                <Typography
                  sx={{
                    fontSize: { xs: 56, md: 96 },
                    lineHeight: 0.9,
                    fontWeight: 500,
                    letterSpacing: '-0.04em',
                    color: palette.primary[900],
                  }}
                >
                  {s.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 11, md: 12 },
                    letterSpacing: '0.18em',
                    fontWeight: 700,
                    color: palette.neutral[500],
                  }}
                >
                  {s.suffix}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: { xs: 12, md: 13 }, color: palette.neutral[700], lineHeight: 1.5, maxWidth: 220 }}>
                {s.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}