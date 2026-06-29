'use client';

import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Stack, Chip, Link, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type { Product } from '@/lib/shared/types/Product';
import { useTranslations } from '@/lib/i18n/client';

type Props = {
  product: Product;
  locale: string;
};

export function ProductTabs({ product }: Props) {
  const t = useTranslations('productDetail');
  const [value, setValue] = useState(0);

  const tabs = [
    { label: t('description'), content: product.description },
    { label: t('composition'), content: product.composition?.length ? product.composition.join(', ') : null },
    { label: t('indications'), content: product.indications?.length ? product.indications.join(', ') : null },
    { label: t('modeEmploi'), content: product.modeUtilisation?.length ? product.modeUtilisation.join(', ') : null },
    {
      label: t('microbiologie'),
      content: product.microbiologie ? (
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>{t('tabHeaders.germes')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('tabHeaders.resultats')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow><TableCell>Germes totaux</TableCell><TableCell>{product.microbiologie.germes}</TableCell></TableRow>
              <TableRow><TableCell>Levures</TableCell><TableCell>{product.microbiologie.levures}</TableCell></TableRow>
              <TableRow><TableCell>E. coli</TableCell><TableCell>{product.microbiologie.escherichiaColi}</TableCell></TableRow>
              <TableRow><TableCell>P. aeruginosa</TableCell><TableCell>{product.microbiologie.pseudomonasAeruginosa}</TableCell></TableRow>
              <TableRow><TableCell>S. aureus</TableCell><TableCell>{product.microbiologie.staphylococcusAureus}</TableCell></TableRow>
              <TableRow><TableCell>C. albicans</TableCell><TableCell>{product.microbiologie.candidaAlbicans}</TableCell></TableRow>
              {product.microbiologie.conclusion && (
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Conclusion</TableCell>
                  <TableCell>{product.microbiologie.conclusion}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null,
    },
    {
      label: t('downloads'),
      content: product.pdfs?.length ? (
        <Stack spacing={1}>
          {product.pdfs.map((pdf) => (
            <Button
              key={pdf.publicId}
              component={Link}
              href={pdf.secureUrl}
              target="_blank"
              variant="outlined"
              size="small"
            >
              {t('download')} — {pdf.format.toUpperCase()}
            </Button>
          ))}
        </Stack>
      ) : null,
    },
    { label: t('qa'), content: null },
  ];

  const visibleTabs = tabs.filter((tab) => tab.content !== null);

  if (visibleTabs.length === 0) return null;

  return (
    <Box sx={{ mt: 6 }}>
      <Tabs
        value={value}
        onChange={(_, v) => setValue(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          borderBottom: 1,
          borderColor: 'neutral.200',
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: 14,
            color: 'neutral.500',
            '&.Mui-selected': { color: 'primary.500' },
          },
          '& .MuiTabs-indicator': { bgcolor: 'primary.500' },
        }}
      >
        {visibleTabs.map((tab) => (
          <Tab key={tab.label} label={tab.label} />
        ))}
      </Tabs>

      <Box sx={{ py: 2 }}>
        {typeof visibleTabs[value]?.content === 'string' ? (
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {visibleTabs[value].content}
          </Typography>
        ) : (
          visibleTabs[value]?.content
        )}
      </Box>
    </Box>
  );
}
