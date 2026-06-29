'use client';

import { Box, Container, Pagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  locale: string;
  currentPage: number;
  totalPages: number;
};

export function CatalogPagination({ locale, currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', String(page));
      }
      const qs = params.toString();
      router.push(`/${locale}/products${qs ? `?${qs}` : ''}`);
    },
    [router, searchParams, locale],
  );

  if (totalPages <= 1) return null;

  return (
    <Container maxWidth="lg" sx={{ pb: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
}
