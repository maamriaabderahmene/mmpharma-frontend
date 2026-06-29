'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Autocomplete, TextField, Popper, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/i18n/client';
import type { Product } from '@/lib/shared/types/Product';

type Props = {
  locale: string;
};

export function SearchAutocomplete({ locale }: Props) {
  const router = useRouter();
  const t = useTranslations('nav');
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);

  const fetchProducts = useCallback(async (q: string) => {
    if (q.length < 2) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/products?q=${encodeURIComponent(q)}&limit=8`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setOptions(data.products?.data ?? []);
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchProducts(inputValue);
    }, 250);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inputValue, fetchProducts]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      inputValue={inputValue}
      onInputChange={(_, v) => setInputValue(v)}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      noOptionsText={t('noResults') ?? 'Aucun résultat'}
      loadingText={t('loading') ?? 'Chargement...'}
      onChange={(_, value) => {
        if (value) {
          router.push(`/${locale}/products/${value.slug}`);
        }
      }}
      slotProps={{ popper: { placement: 'bottom-start' } }}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <Box
            component="li"
            key={option.id}
            {...rest}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', py: 1 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {option.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'neutral.500' }}>
              {option.code}
            </Typography>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t('searchPlaceholder')}
          size="small"
          slotProps={{
            input: {
              ...params.slotProps.input,
              sx: { borderRadius: 8, bgcolor: 'neutral.100', '& fieldset': { border: 'none' } },
              endAdornment: (
                <Box
                  component="kbd"
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    alignItems: 'center',
                    px: 0.75,
                    py: 0.25,
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'neutral.500',
                    bgcolor: 'neutral.200',
                    borderRadius: 0.5,
                    fontFamily: 'monospace',
                    letterSpacing: '0.02em',
                  }}
                >
                  ⌘K
                </Box>
              ),
            },
          }}
        />
      )}
      sx={{ minWidth: 280 }}
    />
  );
}
