import { Box, Typography, Chip, Stack, Button, Divider } from '@mui/material';
import type { Product } from '@/lib/shared/types/Product';
import { getTranslations } from '@/lib/i18n/server';

const RANGE_LABELS: Record<string, string> = {
  hygiene: 'Gamme I — Hygiène',
  detergent: 'Gamme II — Détergent',
  disinfectant: 'Gamme III — Désinfectant',
  inox: 'Gamme IV — Inox',
  misc: 'Gamme V — Divers',
};

type Props = {
  product: Product;
  locale: string;
};

export async function ProductMeta({ product, locale }: Props) {
  const t = await getTranslations(locale, 'products');

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
        <Typography variant="caption" sx={{ color: 'neutral.500', fontWeight: 600 }}>
          {product.code}
        </Typography>
        <Chip
          label={RANGE_LABELS[product.range] ?? product.range}
          size="small"
          sx={{ height: 20, fontSize: 10, fontWeight: 600, bgcolor: 'primary.50', color: 'primary.500' }}
        />
        {product.isHauteGamme && (
          <Chip
            label="Haute gamme"
            size="small"
            color="warning"
            sx={{ height: 20, fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}
          />
        )}
      </Stack>

      <Typography variant="h1" sx={{ fontSize: { xs: 24, md: 32 }, color: 'text.primary', mb: 2 }}>
        {product.name}
      </Typography>

      {product.scent && (
        <Typography variant="body2" sx={{ color: 'neutral.700', mb: 2 }}>
          Parfum : {product.scent}
        </Typography>
      )}

      <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 3 }}>
        {product.description}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {product.conditionnement && product.conditionnement.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary', mb: 1 }}>
            Conditionnements disponibles
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {product.conditionnement.map((c) => (
              <Chip
                key={c}
                label={c}
                variant="outlined"
                sx={{ borderColor: 'primary.300', color: 'primary.500', fontWeight: 600 }}
              />
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button variant="primary" size="large" sx={{ flex: 1 }}>
          {t('addToCart')}
        </Button>
        <Button variant="secondary" size="large" sx={{ flex: 1 }}>
          {t('requestQuote')}
        </Button>
      </Stack>
    </Box>
  );
}
