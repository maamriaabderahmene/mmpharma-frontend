'use client';

import { useState } from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import { palette } from '@/theme/palette';

const faqs = [
  {
    q: 'Vos produits sont-ils conformes à la réglementation Marocaine ?',
    a: 'Oui, tous nos produits respectent le Journal Officiel n°16 2020 et les normes pharmaceutiques en vigueur au Maroc. Nous effectuons des contrôles microbiologiques rigoureux sur chaque lot.',
  },
  {
    q: 'Quelle est la durée de conservation de vos produits ?',
    a: 'Nos produits ont une durée de conservation de 24 à 36 mois selon la gamme. La date de péremption est indiquée sur chaque conditionnement.',
  },
  {
    q: "Puis-je obtenir une fiche technique complète ?",
    a: "Absolument. Chaque produit dispose d'une fiche technique détaillée incluant la composition, les indications, les résultats microbiologiques. Elles sont téléchargeables depuis la page produit.",
  },
  {
    q: 'Quels sont les délais et modalités de livraison ?',
    a: 'Nous livrons partout au Maroc sous 24 à 72 heures. Un devis personnalisé vous est adressé sous 48 heures ouvrées.',
  },
  {
    q: 'Comment obtenir un devis pour une commande en gros ?',
    a: 'Vous pouvez nous contacter via notre formulaire de demande de devis ou par téléphone. Notre équipe commerciale vous répondra sous 48 heures.',
  },
  {
    q: 'Puis-je commander en tant que particulier ?',
    a: "Notre catalogue est principalement destiné aux professionnels de santé, hôteliers, industriels et collectivités. Contactez-nous pour étudier votre besoin spécifique.",
  },
] as const;

const mono = "'JetBrains Mono', ui-monospace, monospace";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const navy = palette.primary[900];
  const gold = palette.accent[500];
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: palette.neutral[50] }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 10 }} sx={{ mb: { xs: 6, md: 8 } }}>
          <Box sx={{ flex: '0 0 auto', minWidth: { md: 260 } }}>
            <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.3em', color: gold, textTransform: 'uppercase', mb: 2 }}>
              N° 09 — FAQ
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 40, sm: 56, md: 72 },
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: navy,
                fontWeight: 600,
              }}
            >
              Questions,<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: gold }}>réponses.</span>
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Box
                  key={i}
                  onClick={() => setOpen(isOpen ? null : i)}
                  sx={{
                    cursor: 'pointer',
                    borderTop: `1px solid ${palette.neutral[300]}`,
                    py: { xs: 3, md: 3.5 },
                    display: 'flex',
                    gap: { xs: 2, md: 4 },
                    alignItems: 'flex-start',
                    transition: 'background 0.2s',
                    '&:last-child': { borderBottom: `1px solid ${palette.neutral[300]}` },
                    '&:hover .q': { color: gold },
                  }}
                >
                  <Typography sx={{ fontFamily: mono, fontSize: 11, color: palette.neutral[500], mt: 0.5, minWidth: 32 }}>
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      className="q"
                      sx={{
                        fontSize: { xs: 17, md: 20 },
                        fontWeight: 500,
                        color: navy,
                        transition: 'color 0.2s',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {faq.q}
                    </Typography>
                    <Box
                      sx={{
                        maxHeight: isOpen ? 400 : 0,
                        opacity: isOpen ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'all 0.35s ease',
                        mt: isOpen ? 2 : 0,
                      }}
                    >
                      <Typography sx={{ fontSize: 15, lineHeight: 1.75, color: palette.neutral[700], maxWidth: 640 }}>
                        {faq.a}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    aria-hidden
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      border: `1px solid ${isOpen ? gold : palette.neutral[300]}`,
                      color: isOpen ? gold : navy,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      transition: 'all 0.2s',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      flexShrink: 0,
                      mt: 0.5,
                    }}
                  >
                    +
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
