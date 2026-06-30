import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { palette } from '@/theme/palette';

const faqs = [
  {
    q: 'Vos produits sont-ils conformes à la réglementation marocaine ?',
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

export function FAQ() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: palette.neutral[0] }}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: 28, md: 36 },
            color: palette.primary[900],
          }}
        >
          Questions fréquentes
        </Typography>

        {faqs.map((faq, i) => (
          <Accordion
            key={i}
            sx={{
              mb: 1,
              borderRadius: 2,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: palette.primary[500] }} />}>
              <Typography variant="body1" sx={{ fontWeight: 600, pr: 2, color: palette.primary[900] }}>
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ lineHeight: 1.7, color: palette.neutral[700] }}>
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
