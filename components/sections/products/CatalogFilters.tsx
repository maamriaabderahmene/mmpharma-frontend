'use client';

import { useCallback } from 'react';
import {
  Box,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from '@/lib/i18n/client';
import { ProductRangeValues } from '@/lib/shared/constants/ProductRange';
import type { ProductSortOption } from '@/lib/shared/types/Product';

const RANGE_LABELS: Record<string, string> = {
  hygiene: 'Gamme I — Hygiène',
  detergent: 'Gamme II — Détergent',
  disinfectant: 'Gamme III — Désinfectant',
  inox: 'Gamme IV — Inox',
  misc: 'Gamme V — Divers',
};

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: 'popular', label: 'Popularité' },
  { value: 'newest', label: 'Plus récents' },
  { value: 'name_asc', label: 'Nom A → Z' },
  { value: 'name_desc', label: 'Nom Z → A' },
];

type Props = {
  locale: string;
  scents: string[];
};

export function CatalogFilters({ locale, scents }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('products.filter');

  const currentRange = searchParams.get('range') || '';
  const currentScent = searchParams.get('scent') || '';
  const currentSort = searchParams.get('sort') || '';

  const buildHref = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      params.delete('page');
      const qs = params.toString();
      return `/${locale}/products${qs ? `?${qs}` : ''}`;
    },
    [locale, searchParams],
  );

  const handleRange = useCallback(
    (_: React.MouseEvent<HTMLElement>, value: string) => {
      router.push(buildHref({ range: value }));
    },
    [router, buildHref],
  );

  const handleReset = useCallback(() => {
    router.push(`/${locale}/products`);
  }, [router, locale]);

  const handleSort = useCallback(
    (value: string) => {
      router.push(buildHref({ sort: value }));
    },
    [router, buildHref],
  );

  const handleScent = useCallback(
    (value: string | null) => {
      router.push(buildHref({ scent: value }));
    },
    [router, buildHref],
  );

  const hasActiveFilters = currentRange || currentScent;

  return (
    <Box component="section" sx={{ pb: 3 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ alignItems: { xs: 'stretch', md: 'center' }, flexWrap: 'wrap' }}
        >
          <ToggleButtonGroup
            value={currentRange}
            exclusive
            onChange={handleRange}
            size="small"
            sx={{
              flexWrap: 'wrap',
              gap: 0.5,
              '& .MuiToggleButton-root': {
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
                border: '1px solid',
                borderColor: 'neutral.200',
                color: 'neutral.700',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: 13,
                '&.Mui-selected': {
                  bgcolor: 'primary.500',
                  color: 'common.white',
                  borderColor: 'primary.500',
                  '&:hover': { bgcolor: 'primary.700' },
                },
              },
            }}
          >
            <ToggleButton value="">Toutes</ToggleButton>
            {ProductRangeValues.map((r) => (
              <ToggleButton key={r} value={r}>
                {RANGE_LABELS[r] ?? r}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Autocomplete
            value={currentScent || null}
            onChange={(_, v) => handleScent(v)}
            options={scents}
            getOptionLabel={(o) => o}
            renderInput={(params) => (
              <TextField {...params} label={t('scent')} size="small" sx={{ minWidth: 180 }} />
            )}
            sx={{ minWidth: 180 }}
            size="small"
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="sort-label">{t('sort')}</InputLabel>
            <Select
              labelId="sort-label"
              value={currentSort}
              label={t('sort')}
              onChange={(e) => handleSort(e.target.value)}
            >
              <MenuItem value="">—</MenuItem>
              {SORT_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {hasActiveFilters && (
            <Button variant="ghost" size="small" onClick={handleReset}>
              {t('reset')}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
