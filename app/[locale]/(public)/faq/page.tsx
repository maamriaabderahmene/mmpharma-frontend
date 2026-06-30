'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const faqs = [
  {
    q: 'Vos produits sont-ils conformes à la réglementation ALGERIAaine ?',
    a: 'Oui, tous nos produits respectent le Journal Officiel n°16 2020 et les normes pharmaceutiques en vigueur au ALGERIA. Nous effectuons des contrôles microbiologiques rigoureux sur chaque lot.',
    category: 'réglementation',
  },
  {
    q: 'Quelle est la durée de conservation de vos produits ?',
    a: 'Nos produits ont une durée de conservation de 24 à 36 mois selon la gamme. La date de péremption est indiquée sur chaque conditionnement.',
    category: 'produits',
  },
  {
    q: 'Puis-je obtenir une fiche technique complète ?',
    a: 'Absolument. Chaque produit dispose d\'une fiche technique détaillée incluant la composition, les indications, les résultats microbiologiques. Elles sont téléchargeables depuis la page produit.',
    category: 'produits',
  },
  {
    q: 'Quels sont les délais et modalités de livraison ?',
    a: 'Nous livrons partout au ALGERIA sous 24 à 72 heures. Un devis personnalisé vous est adressé sous 48 heures ouvrées.',
    category: 'commandes',
  },
  {
    q: 'Comment obtenir un devis pour une commande en gros ?',
    a: 'Vous pouvez nous contacter via notre formulaire de demande de devis ou par téléphone. Notre équipe commerciale vous répondra sous 48 heures.',
    category: 'commandes',
  },
  {
    q: 'Puis-je commander en tant que particulier ?',
    a: 'Notre catalogue est principalement destiné aux professionnels de santé, hôteliers, industriels et collectivités. Contactez-nous pour étudier votre besoin spécifique.',
    category: 'commandes',
  },
  {
    q: 'Proposez-vous des produits certifiés bio ou écologiques ?',
    a: 'Nous développons des formulations respectueuses de l\'environnement tout en maintenant une efficacité optimale. Contactez-nous pour en savoir plus sur nos gammes éco-responsables.',
    category: 'produits',
  },
  {
    q: 'Comment sont effectués les contrôles qualité ?',
    a: 'Chaque lot de production est soumis à des analyses microbiologiques et physico-chimiques dans notre laboratoire interne. Nous conservons des échantillons de chaque lot pendant toute la durée de conservation du produit.',
    category: 'qualité',
  },
];

type Props = {
  params: Promise<{ locale: string }>;
};

export default function FAQPage({ params }: Props) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filtered = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: 32, md: 48 }, color: 'primary.main', textAlign: 'center', mb: 2 }}
        >
          Questions fréquentes
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', textAlign: 'center', mb: 6, maxWidth: 500, mx: 'auto' }}
        >
          Tout ce que vous devez savoir sur nos produits et services.
        </Typography>

        <TextField
          placeholder="Rechercher une question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 4 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {filtered.length === 0 ? (
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', py: 8 }}>
            Aucun résultat pour "{search}".
          </Typography>
        ) : (
          filtered.map((faq, i) => (
            <Accordion
              key={i}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
              sx={{ mb: 1 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}>
                <Typography variant="body1" sx={{ fontWeight: 600, pr: 2 }}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Container>
    </Box>
  );
}
