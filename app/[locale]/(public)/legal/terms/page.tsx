import type { Metadata } from 'next';
import { Container, Typography, Box } from '@mui/material';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Conditions d'utilisation",
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/legal/terms` },
  };
}

export default async function TermsPage({ params }: Props) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 40 }, color: 'primary.main', mb: 6 }}>
        Conditions d'utilisation
      </Typography>

      <Box
        sx={{
          '& h2': { fontSize: 22, fontWeight: 700, color: 'primary.main', mt: 5, mb: 2 },
          '& h3': { fontSize: 18, fontWeight: 600, color: 'primary.main', mt: 4, mb: 1.5 },
          '& p': { fontSize: 15, lineHeight: 1.8, color: 'text.secondary', mb: 2 },
          '& ul': { pl: 3, mb: 2, '& li': { fontSize: 15, lineHeight: 1.8, color: 'text.secondary', mb: 0.5 } },
        }}
      >
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions d'utilisation régissent l'accès et l'utilisation du site internet
          mmpharma.ma édité par MM Pharma.
        </p>

        <h2>2. Produits et services</h2>
        <p>
          MM Pharma commercialise des produits d'hygiène, de désinfection et d'entretien destinés
          aux professionnels. Les informations présentées sur le site sont fournies à titre indicatif
          et peuvent être modifiées sans préavis.
        </p>

        <h2>3. Commandes</h2>
        <p>
          Toute commande passée sur le site vaut acceptation des présentes conditions. MM Pharma se
          réserve le droit de refuser toute commande pour des motifs légitimes.
        </p>

        <h2>4. Prix et paiement</h2>
        <p>
          Les prix sont indiqués en dirhams marocains (MAD) hors taxes. Le paiement s'effectue selon
          les modalités précisées lors de la commande.
        </p>

        <h2>5. Livraison</h2>
        <p>
          Les délais de livraison sont indiqués à titre indicatif. MM Pharma ne saurait être tenu
          responsable des retards indépendants de sa volonté.
        </p>

        <h2>6. Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu du site (textes, images, logos, vidéos) est la propriété exclusive
          de MM Pharma et ne peut être reproduit sans autorisation préalable.
        </p>

        <h2>7. Responsabilité</h2>
        <p>
          MM Pharma ne saurait être tenu responsable des dommages indirects résultant de l'utilisation
          du site ou des produits commandés.
        </p>
      </Box>
    </Container>
  );
}
