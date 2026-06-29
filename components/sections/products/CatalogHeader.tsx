import { Container, Typography, Box } from '@mui/material';
import { getTranslations } from '@/lib/i18n/server';

type Props = {
  locale: string;
  totalProducts: number;
};

export async function CatalogHeader({ locale, totalProducts }: Props) {
  const t = await getTranslations(locale, 'products');

  return (
    <Box component="section" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 28, md: 40 },
            color: 'primary.main',
            mb: 1,
          }}
        >
          {t('title')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
          {totalProducts} {t('stats')}
        </Typography>
      </Container>
    </Box>
  );
}
