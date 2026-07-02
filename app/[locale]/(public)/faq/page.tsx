'use client';

import { useState } from 'react';
import { Container, Typography, Box, TextField, InputAdornment, Stack, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { palette } from '@/theme/palette';

const faqs = [
  {
    q: 'Vos produits sont-ils conformes à la réglementation algérienne ?',
    a: 'Oui, tous nos produits respectent le Journal Officiel n°16 2020 et les normes pharmaceutiques en vigueur en Algérie. Nous effectuons des contrôles microbiologiques rigoureux sur chaque lot.',
    category: 'réglementation',
  },
  {
    q: 'Quelle est la durée de conservation de vos produits ?',
    a: 'Nos produits ont une durée de conservation de 24 à 36 mois selon la gamme. La date de péremption est indiquée sur chaque conditionnement.',
    category: 'produits',
  },
  {
    q: "Puis-je obtenir une fiche technique complète ?",
    a: "Absolument. Chaque produit dispose d'une fiche technique détaillée incluant la composition, les indications, les résultats microbiologiques. Elles sont téléchargeables depuis la page produit.",
    category: 'produits',
  },
  {
    q: 'Quels sont les délais et modalités de livraison ?',
    a: 'Nous livrons partout en Algérie sous 24 à 72 heures. Un devis personnalisé vous est adressé sous 48 heures ouvrées.',
    category: 'commandes',
  },
  {
    q: 'Comment obtenir un devis pour une commande en gros ?',
    a: 'Vous pouvez nous contacter via notre formulaire de demande de devis ou par téléphone. Notre équipe commerciale vous répondra sous 48 heures.',
    category: 'commandes',
  },
  {
    q: 'Puis-je commander en tant que particulier ?',
    a: "Notre catalogue est principalement destiné aux professionnels de santé, hôteliers, industriels et collectivités. Contactez-nous pour étudier votre besoin spécifique.",
    category: 'commandes',
  },
  {
    q: 'Proposez-vous des produits certifiés bio ou écologiques ?',
    a: "Nous développons des formulations respectueuses de l'environnement tout en maintenant une efficacité optimale. Contactez-nous pour en savoir plus sur nos gammes éco-responsables.",
    category: 'produits',
  },
  {
    q: 'Comment sont effectués les contrôles qualité ?',
    a: 'Chaque lot de production est soumis à des analyses microbiologiques et physico-chimiques dans notre laboratoire interne. Nous conservons des échantillons de chaque lot pendant toute la durée de conservation du produit.',
    category: 'qualité',
  },
] as const;

const mono = "'JetBrains Mono', ui-monospace, monospace";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function FAQPage({ params }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  const filtered = faqs.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !category || faq.category === category;
    return matchesSearch && matchesCat;
  });

  const navy = palette.primary[900];
  const gold = palette.accent[500];

  return (
    <>
      {/* Editorial hero */}
      <Box sx={{ bgcolor: navy, color: '#fff', pt: { xs: 14, md: 20 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
        <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 300px at 15% 40%, rgba(197,160,89,0.14), transparent 60%)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.34em', color: gold, textTransform: 'uppercase', mb: 3 }}>
            N° 09 — Questions fréquentes
          </Typography>
          <Typography sx={{ fontSize: { xs: 44, sm: 68, md: 96 }, lineHeight: 0.95, letterSpacing: '-0.035em', fontWeight: 600, maxWidth: 900 }}>
            Tout ce que vous devez<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: gold }}>savoir.</span>
          </Typography>
          <Typography sx={{ mt: 4, maxWidth: 560, fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            Produits, réglementation, commandes, livraison — les réponses claires
            de notre équipe pharmaceutique et commerciale.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: palette.neutral[50] }}>
        <Container maxWidth="lg">
          <TextField
            placeholder="Rechercher une question…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 0,
                bgcolor: '#fff',
                fontSize: 15,
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: palette.neutral[500] }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Stack direction="row" spacing={1} sx={{ mb: 6, flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label="Tout"
              onClick={() => setCategory(null)}
              sx={{
                borderRadius: 0,
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                bgcolor: !category ? navy : 'transparent',
                color: !category ? '#fff' : navy,
                border: `1px solid ${navy}`,
                '&:hover': { bgcolor: !category ? navy : palette.neutral[100] },
              }}
            />
            {categories.map((c) => (
              <Chip
                key={c}
                label={c}
                onClick={() => setCategory(c)}
                sx={{
                  borderRadius: 0,
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  bgcolor: category === c ? navy : 'transparent',
                  color: category === c ? '#fff' : navy,
                  border: `1px solid ${navy}`,
                  '&:hover': { bgcolor: category === c ? navy : palette.neutral[100] },
                }}
              />
            ))}
          </Stack>

          {filtered.length === 0 ? (
            <Typography sx={{ color: palette.neutral[700], textAlign: 'center', py: 10, fontFamily: mono, letterSpacing: '0.14em' }}>
              Aucun résultat pour « {search} ».
            </Typography>
          ) : (
            <Box>
              {filtered.map((faq, i) => {
                const isOpen = openIdx === i;
                return (
                  <Box
                    key={faq.q}
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    sx={{
                      cursor: 'pointer',
                      borderTop: `1px solid ${palette.neutral[300]}`,
                      py: { xs: 3, md: 3.5 },
                      display: 'flex',
                      gap: { xs: 2, md: 4 },
                      alignItems: 'flex-start',
                      '&:last-child': { borderBottom: `1px solid ${palette.neutral[300]}` },
                      '&:hover .q': { color: gold },
                    }}
                  >
                    <Typography sx={{ fontFamily: mono, fontSize: 11, color: palette.neutral[500], mt: 0.5, minWidth: 32 }}>
                      {String(i + 1).padStart(2, '0')}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography className="q" sx={{ fontSize: { xs: 17, md: 20 }, fontWeight: 500, color: navy, transition: 'color 0.2s', letterSpacing: '-0.01em' }}>
                        {faq.q}
                      </Typography>
                      <Box sx={{ maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'all 0.35s ease', mt: isOpen ? 2 : 0 }}>
                        <Typography sx={{ fontSize: 15, lineHeight: 1.75, color: palette.neutral[700], maxWidth: 720 }}>
                          {faq.a}
                        </Typography>
                      </Box>
                    </Box>
                    <Box aria-hidden sx={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${isOpen ? gold : palette.neutral[300]}`, color: isOpen ? gold : navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'all 0.2s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', flexShrink: 0, mt: 0.5 }}>
                      +
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
