import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import ProductModel from '@/lib/server/db/models/Product';
import type { ProductCategory } from '@/lib/shared/constants/ProductCategory';
import type { ProductRange } from '@/lib/shared/constants/ProductRange';

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const products: Array<{
  code: string;
  name: string;
  range: ProductRange;
  category: ProductCategory;
  scent?: string;
  description: string;
  indications: string[];
  composition: string[];
  conditionnement: string[];
  modeUtilisation: string[];
  microbiologie?: {
    germes: string;
    levures: string;
    escherichiaColi: string;
    pseudomonasAeruginosa: string;
    staphylococcusAureus: string;
    candidaAlbicans: string;
    conclusion?: string;
  };
  tags: string[];
  isHauteGamme: boolean;
  isActive: boolean;
}> = [
  // ── Range I: Produits d'hygiène et de nettoyage personnel (12 SKUs) ──
  {
    code: 'HYDRO-CLEAN',
    name: 'Gel hydroalcoolique désinfectant pour les mains *HAUTE GAMME*',
    range: 'hygiene',
    category: 'hygiene-corps',
    description:
      "Formulation alcoolique à 70% d'éthanol enrichie en agents hydratants et émollients. Ce gel haute gamme offre une désinfection rapide et efficace des mains sans rinçage, tout en respectant l'intégrité de la peau grâce à sa formule enrichie en glycérine et vitamine E. Idéal pour les environnements exigeant une hygiène irréprochable : milieux hospitaliers, laboratoires, industries agroalimentaires, et collectivités.",
    indications: [
      'Désinfection des mains propres et sèches',
      'Utilisation en milieu hospitalier et paramédical',
      'Soins infirmiers et gestes de soins',
      'Hygiène en restauration et agroalimentaire',
      'Usage professionnel et grand public',
    ],
    composition: ['Éthanol 70%', 'Eau purifiée', 'Glycérine', 'Carbomère', 'Vitamine E', 'Triéthanolamine'],
    conditionnement: ['5 L', '1 L', '500 mL', '250 mL', '100 mL'],
    modeUtilisation: [
      'Appliquer une dose suffisante (3 à 5 mL) sur mains propres et sèches',
      'Frotter soigneusement pendant 30 secondes jusqu\'à séchage complet',
      'Couvrir toutes les surfaces des mains : paumes, dos, espaces interdigitaux, extrémités',
      'Ne pas rincer. Usage externe uniquement.',
      'Se référer à la fiche technique pour les protocoles détaillés',
    ],
    microbiologie: {
      germes: '< 10 UFC/g (ISO 21149)',
      levures: '< 10 UFC/g (ISO 16212)',
      escherichiaColi: 'Absence dans 1 g (ISO 21150)',
      pseudomonasAeruginosa: 'Absence dans 1 g (ISO 22717)',
      staphylococcusAureus: 'Absence dans 1 g (ISO 22718)',
      candidaAlbicans: 'Absence dans 1 g (ISO 18416)',
      conclusion:
        'Qualité bactériologique satisfaisante. Conforme à l\'arrêté du 21/10/2019 (JO N°16 du 24 mars 2020).',
    },
    tags: ['gel hydroalcoolique', 'désinfection mains', 'hygiène hospitalière', 'éthanol', 'haute gamme'],
    isHauteGamme: true,
    isActive: true,
  },
  {
    code: 'GEL-HYDRO',
    name: 'Gel hydroalcoolique désinfectant pour les mains',
    range: 'hygiene',
    category: 'hygiene-corps',
    description:
      "Solution hydroalcoolique sous forme gel à 70% d'éthanol pour la désinfection rapide des mains. Formulation standard efficace contre les bactéries, virus et champignons. Adapté aux usages quotidiens dans les établissements de santé, les écoles, les bureaux et les espaces publics.",
    indications: [
      'Désinfection des mains propres et sèches',
      'Usage courant en collectivités et établissements recevant du public',
      'Hygiène des mains en milieu professionnel',
    ],
    composition: ['Éthanol 70%', 'Eau purifiée', 'Glycérine', 'Carbomère', 'Triéthanolamine'],
    conditionnement: ['5 L'],
    modeUtilisation: [
      'Appliquer une dose de 3 mL sur mains propres et sèches',
      'Frotter pendant 30 secondes jusqu\'à évaporation complète',
      'Ne pas rincer. Usage externe uniquement.',
    ],
    tags: ['gel hydroalcoolique', 'désinfection mains', 'éthanol'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'SAV-NET',
    name: 'Savon liquide pour les mains',
    range: 'hygiene',
    category: 'hygiene-corps',
    scent: 'Lavande',
    description:
      'Savon liquide doux pour le lavage quotidien des mains. Sa formule enrichie en agents lavants d\'origine végétale nettoie en profondeur tout en respectant la barrière cutanée. Le parfum délicat de lavande apporte une sensation de propreté et de bien-être. Convient à un usage intensif en milieu professionnel.',
    indications: [
      'Lavage courant des mains',
      'Hygiène quotidienne en milieu professionnel',
      'Restauration et agroalimentaire',
      'Établissements de santé et médico-sociaux',
      'Écoles et collectivités',
    ],
    composition: ['Eau purifiée', 'Sulfate de sodium', 'Cocamidopropyl bétaine', 'Glycérine', 'Chlorure de sodium', 'Acide citrique', 'Parfum lavande'],
    conditionnement: ['5 L', '1 L', '500 mL'],
    modeUtilisation: [
      'Humidifier les mains',
      'Appliquer une dose de savon liquide',
      'Laver soigneusement pendant 30 secondes',
      'Rincer abondamment à l\'eau claire',
      'Sécher avec un essuie-mains propre ou un sèche-mains',
    ],
    tags: ['savon liquide', 'lavande', 'hygiène mains', 'lavage mains'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'DERMACIDE',
    name: 'Solution moussante nettoyante pour les mains (antiseptique)',
    range: 'hygiene',
    category: 'hygiene-corps',
    description:
      'Solution moussante antiseptique pour le nettoyage et la désinfection des mains. Sa formule associe des agents tensioactifs doux à un actif antiseptique pour une action combinée de lavage et de réduction de la flore microbienne. Elle est particulièrement adaptée aux zones de soins et aux blocs opératoires.',
    indications: [
      'Nettoyage antiseptique des mains en milieu de soins',
      'Préparation des mains avant un acte chirurgical',
      'Hygiène des mains en milieu hospitalier',
    ],
    composition: ['Eau purifiée', 'Chlorhexidine digluconate', 'Sulfate de sodium', 'Cocamidopropyl bétaine', 'Glycérine', 'Acide citrique'],
    conditionnement: ['1 L'],
    modeUtilisation: [
      'Humidifier les mains',
      'Appliquer une dose de 5 mL',
      'Laver soigneusement pendant 1 minute',
      'Rincer abondamment',
      'Sécher avec un champ stérile',
    ],
    tags: ['antiseptique', 'solution moussante', 'hygiène mains', 'milieu hospitalier', 'chlorhexidine'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'SAV-SAIN-LAV',
    name: 'Savon liquide désinfectant pour les mains',
    range: 'hygiene',
    category: 'hygiene-corps',
    scent: 'Lavande',
    description:
      'Savon liquide désinfectant alliant pouvoir nettoyant et action antimicrobienne. Formulé pour réduire la flore bactérienne tout en nettoyant la peau. Idéal pour les environnements où le lavage désinfectant des mains est requis sans disponibilité de point d\'eau permanent. Parfumé à la lavande.',
    indications: [
      'Lavage désinfectant des mains',
      'Hygiène en restauration collective',
      'Milieux de soins et médico-sociaux',
      'Industrie agroalimentaire',
    ],
    composition: ['Eau purifiée', 'Sulfate de sodium', 'Cocamidopropyl bétaine', 'Triclosan', 'Glycérine', 'Acide citrique', 'Parfum lavande'],
    conditionnement: ['5 L', '1 L', '500 mL'],
    modeUtilisation: [
      'Appliquer une dose suffisante sur mains humides',
      'Frotter pendant 30 à 60 secondes',
      'Rincer abondamment à l\'eau claire',
      'Sécher avec un linge propre',
    ],
    microbiologie: {
      germes: '< 10 UFC/g (ISO 21149)',
      levures: '< 10 UFC/g (ISO 16212)',
      escherichiaColi: 'Absence dans 1 g (ISO 21150)',
      pseudomonasAeruginosa: 'Absence dans 1 g (ISO 22717)',
      staphylococcusAureus: 'Absence dans 1 g (ISO 22718)',
      candidaAlbicans: 'Absence dans 1 g (ISO 18416)',
      conclusion:
        'Qualité bactériologique satisfaisante. Conforme à l\'arrêté du 21/10/2019 (JO N°16 du 24 mars 2020).',
    },
    tags: ['savon désinfectant', 'lavande', 'hygiène mains', 'antibactérien'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'SAV-SAIN-CIT',
    name: 'Savon liquide désinfectant pour les mains',
    range: 'hygiene',
    category: 'hygiene-corps',
    scent: 'Citron',
    description:
      'Savon liquide désinfectant au citron alliant pouvoir nettoyant et action antimicrobienne. Formulé pour réduire la flore bactérienne tout en nettoyant la peau. Le parfum frais du citron apporte une sensation de propreté revitalisante.',
    indications: [
      'Lavage désinfectant des mains',
      'Hygiène en restauration collective',
      'Milieux de soins et médico-sociaux',
      'Industrie agroalimentaire',
    ],
    composition: ['Eau purifiée', 'Sulfate de sodium', 'Cocamidopropyl bétaine', 'Triclosan', 'Glycérine', 'Acide citrique', 'Parfum citron'],
    conditionnement: ['5 L', '1 L', '500 mL'],
    modeUtilisation: [
      'Appliquer une dose suffisante sur mains humides',
      'Frotter pendant 30 à 60 secondes',
      'Rincer abondamment à l\'eau claire',
      'Sécher avec un linge propre',
    ],
    microbiologie: {
      germes: '< 10 UFC/g (ISO 21149)',
      levures: '< 10 UFC/g (ISO 16212)',
      escherichiaColi: 'Absence dans 1 g (ISO 21150)',
      pseudomonasAeruginosa: 'Absence dans 1 g (ISO 22717)',
      staphylococcusAureus: 'Absence dans 1 g (ISO 22718)',
      candidaAlbicans: 'Absence dans 1 g (ISO 18416)',
      conclusion:
        'Qualité bactériologique satisfaisante. Conforme à l\'arrêté du 21/10/2019 (JO N°16 du 24 mars 2020).',
    },
    tags: ['savon désinfectant', 'citron', 'hygiène mains', 'antibactérien'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'SAV-DOUX-CIT',
    name: 'Savon liquide ultra-doux pour les mains',
    range: 'hygiene',
    category: 'hygiene-corps',
    scent: 'Citron',
    description:
      'Savon liquide ultra-doux spécialement formulé pour les lavages fréquents et les peaux sensibles. Sa base lavante surgras enrichie en glycérine prévient le dessèchement cutané tout en nettoyant en douceur. Le parfum citron apporte une note de fraîcheur agréable.',
    indications: [
      'Lavage fréquent des mains',
      'Peaux sensibles et sujettes au dessèchement',
      'Milieux de soins avec lavages répétés',
      'Usage quotidien en collectivités',
    ],
    composition: ['Eau purifiée', 'Sulfate de sodium', 'Cocamidopropyl bétaine', 'Glycérine', 'Huile de coco', 'Acide citrique', 'Parfum citron'],
    conditionnement: ['5 L', '1 L', '500 mL'],
    modeUtilisation: [
      'Humidifier les mains',
      'Appliquer une petite dose',
      'Laver doucement pendant 20 à 30 secondes',
      'Rincer abondamment',
      'Sécher sans frotter',
    ],
    tags: ['savon ultra-doux', 'citron', 'peau sensible', 'hygiène mains'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'SAV-DOUX-LAV',
    name: 'Savon liquide ultra hydratant pour les mains',
    range: 'hygiene',
    category: 'hygiene-corps',
    scent: 'Lavande',
    description:
      'Savon liquide enrichi en actifs hydratants pour un lavage tout en douceur. Sa formule associe des agents nettoyants doux à des ingrédients nourrissants pour préserver le film hydrolipidique de la peau. La lavande apaise et procure une sensation de confort immédiat.',
    indications: [
      'Mains sèches et abîmées par les lavages répétés',
      'Usage en milieu de soins',
      'Hygiène quotidienne des mains',
      'Collectivités et établissements',
    ],
    composition: ['Eau purifiée', 'Sulfate de sodium', 'Cocamidopropyl bétaine', 'Glycérine', 'Beurre de karité', 'Acide citrique', 'Parfum lavande'],
    conditionnement: ['5 L', '1 L', '500 mL'],
    modeUtilisation: [
      'Appliquer sur mains humides',
      'Massage doux pendant 20 à 30 secondes',
      'Rincer à l\'eau tiède',
      'Sécher par tapotements',
    ],
    tags: ['savon hydratant', 'lavande', 'peau sèche', 'hygiène mains'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'SOL-HYDRO',
    name: 'Solution hydroalcoolique désinfectante pour les mains',
    range: 'hygiene',
    category: 'hygiene-corps',
    description:
      'Solution hydroalcoolique prête à l\'emploi pour la désinfection hygiénique des mains par friction. Formulation standard à base d\'éthanol. Sans rinçage, sans savon. Adaptée à tous les secteurs d\'activité où l\'hygiène des mains est essentielle.',
    indications: [
      'Désinfection des mains par friction',
      'Absence de point d\'eau',
      'Milieux de soins, administrations, commerces',
    ],
    composition: ['Éthanol 70%', 'Eau purifiée', 'Glycérine', 'Peroxyde d\'hydrogène'],
    conditionnement: ['5 L', '1 L', '500 mL', '250 mL', '100 mL'],
    modeUtilisation: [
      'Verser 3 mL de solution dans le creux de la main',
      'Frictionner toutes les surfaces des mains pendant 30 secondes',
      'Laisser sécher à l\'air libre',
      'Ne pas rincer. Usage externe.',
    ],
    tags: ['solution hydroalcoolique', 'désinfection mains', 'éthanol', 'friction'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'HYDRO-SAFE',
    name: 'Solution hydroalcoolique désinfectante pour les mains *HAUTE GAMME*',
    range: 'hygiene',
    category: 'hygiene-corps',
    description:
      'Solution hydroalcoolique haute précision à 70% d\'éthanol, enrichie en agents hydratants et adoucissants. Sa formule premium garantit une efficacité maximale tout en offrant un confort d\'utilisation prolongé. Le flacon doseur permet une application maîtrisée. Destinée aux environnements exigeant le plus haut niveau de qualité.',
    indications: [
      'Désinfection hygiénique des mains en milieu sensible',
      'Blocs opératoires et salles blanches',
      'Laboratoires et industries pharmaceutiques',
      'Hôtellerie de luxe et restauration étoilée',
    ],
    composition: ['Éthanol 70%', 'Eau purifiée', 'Glycérine', 'Aloe vera', 'Vitamine E', 'Carbomère'],
    conditionnement: ['5 L', '1 L', '500 mL', '250 mL', '100 mL'],
    modeUtilisation: [
      'Appliquer 3 mL dans le creux de la main',
      'Frictionner toutes les surfaces pendant 30 secondes',
      'Ne pas rincer. Usage externe.',
      'Se référer au protocole d\'utilisation pour les zones à risque',
    ],
    microbiologie: {
      germes: '< 10 UFC/g (ISO 21149)',
      levures: '< 10 UFC/g (ISO 16212)',
      escherichiaColi: 'Absence dans 1 g (ISO 21150)',
      pseudomonasAeruginosa: 'Absence dans 1 g (ISO 22717)',
      staphylococcusAureus: 'Absence dans 1 g (ISO 22718)',
      candidaAlbicans: 'Absence dans 1 g (ISO 18416)',
      conclusion:
        'Qualité bactériologique satisfaisante. Conforme à l\'arrêté du 21/10/2019 (JO N°16 du 24 mars 2020).',
    },
    tags: ['solution hydroalcoolique', 'haute gamme', 'désinfection', 'éthanol', 'aloe vera'],
    isHauteGamme: true,
    isActive: true,
  },
  {
    code: 'SAV-PROTECT-LAV',
    name: 'Savon liquide antibactérien pour les mains',
    range: 'hygiene',
    category: 'hygiene-corps',
    scent: 'Lavande',
    description:
      'Savon liquide antibactérien à la lavande pour une hygiène renforcée au quotidien. Sa formule associe des agents lavants efficaces à un antibactérien pour réduire significativement la flore microbienne. Le parfum lavande apporte une expérience sensorielle agréable lors du lavage.',
    indications: [
      'Lavage antibactérien quotidien des mains',
      'Milieux sensibles : santé, restauration, agroalimentaire',
      'Prévention des infections croisées',
    ],
    composition: ['Eau purifiée', 'Sulfate de sodium', 'Cocamidopropyl bétaine', 'Benzalkonium chloride', 'Glycérine', 'Acide citrique', 'Parfum lavande'],
    conditionnement: ['5 L', '1 L', '500 mL'],
    modeUtilisation: [
      'Humidifier les mains',
      'Appliquer une dose de savon',
      'Frotter vigoureusement pendant 30 secondes',
      'Rincer abondamment',
      'Sécher avec un linge propre ou un sèche-mains',
    ],
    tags: ['savon antibactérien', 'lavande', 'protection mains', 'hygiène'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'SAV-PROTECT-CIT',
    name: 'Savon liquide antibactérien pour les mains',
    range: 'hygiene',
    category: 'hygiene-corps',
    scent: 'Citron',
    description:
      'Savon liquide antibactérien au citron pour une hygiène renforcée au quotidien. Sa formule associe des agents lavants efficaces à un antibactérien pour réduire significativement la flore microbienne. La note citronnée apporte fraîcheur et vitalité.',
    indications: [
      'Lavage antibactérien quotidien des mains',
      'Milieux sensibles : santé, restauration, agroalimentaire',
      'Prévention des infections croisées',
    ],
    composition: ['Eau purifiée', 'Sulfate de sodium', 'Cocamidopropyl bétaine', 'Benzalkonium chloride', 'Glycérine', 'Acide citrique', 'Parfum citron'],
    conditionnement: ['5 L', '1 L', '500 mL'],
    modeUtilisation: [
      'Humidifier les mains',
      'Appliquer une dose de savon',
      'Frotter vigoureusement pendant 30 secondes',
      'Rincer abondamment',
      'Sécher avec un linge propre ou un sèche-mains',
    ],
    tags: ['savon antibactérien', 'citron', 'protection mains', 'hygiène'],
    isHauteGamme: false,
    isActive: true,
  },

  // ── Range II: Produits détergents et nettoyants à usage professionnel (5 SKUs) ──
  {
    code: 'ECLA-PURE',
    name: 'Savon liquide pour machine à laver',
    range: 'detergent',
    category: 'detergent',
    scent: 'Citron',
    description:
      'Lessive liquide professionnelle au citron spécialement conçue pour les machines à laver des collectivités et établissements. Sa formule concentrée offre un lavage en profondeur tout en préservant les textiles. Efficace sur tous types de salissures, elle respecte les fibres et maintient l\'éclat des couleurs.',
    indications: [
      'Lavage du linge en machine pour collectivités',
      'Hôtels, cliniques, restaurants, écoles',
      'Tous types de textiles résistants',
    ],
    composition: ['Eau purifiée', 'Tensioactifs anioniques', 'Tensioactifs non ioniques', 'Savon', 'Enzymes', 'Parfum citron', 'Conservateurs'],
    conditionnement: ['5 L'],
    modeUtilisation: [
      'Verser le dosage recommandé dans le bac à lessive',
      'Utiliser 50 mL par charge pour un lavage standard',
      'Adapter le dosage selon le degré de salissure',
      'Respecter les instructions de lavage des textiles',
    ],
    tags: ['lessive liquide', 'machine à laver', 'citron', 'nettoyant linge', 'professionnel'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'WC-CLEAN',
    name: 'Nettoyant et désinfectant de WC et salle de bain (moussant)',
    range: 'detergent',
    category: 'detergent',
    description:
      'Nettoyant moussant professionnel pour WC et salles de bain. Sa formule détergente associée à un agent désinfectant élimine les salissures tenaces et les dépôts calcaires tout en assainissant les surfaces. Mousse active pour une adhérence optimale sur les parois verticales.',
    indications: [
      'Nettoyage et désinfection des WC',
      'Entretien des salles de bain collectives',
      'Hôtels, restaurants, établissements de santé',
    ],
    composition: ['Eau purifiée', 'Acide chlorhydrique', 'Tensioactifs', 'Agent épaississant', 'Parfum', 'Colorant'],
    conditionnement: ['1 L'],
    modeUtilisation: [
      'Appliquer le produit sur les parois internes de la cuvette',
      'Laisser agir 5 à 10 minutes',
      'Brosser et tirer la chasse',
      'Pour les surfaces externes, appliquer et essuyer avec une éponge',
      'Rincer abondamment',
    ],
    tags: ['nettoyant wc', 'détartrant', 'désinfectant salle de bain', 'moussant'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'AIR-FRESH-CIT',
    name: "Désodorisant d'ambiance",
    range: 'detergent',
    category: 'detergent',
    scent: 'Citron',
    description:
      "Désodorisant liquide professionnel pour assainir et parfumer les espaces intérieurs. Sa formule neutralise les mauvaises odeurs sans les masquer et diffuse un parfum frais et durable au citron. Adapté aux grands volumes : halls d'accueil, couloirs, sanitaires, espaces communs.",
    indications: [
      "Désodorisation des locaux professionnels",
      'Hôtels, restaurants, bureaux, commerces',
      'Sanitaires et vestiaires',
      'Espaces de réception',
    ],
    composition: ['Eau purifiée', 'Tensioactifs non ioniques', 'Parfum citron', 'Huiles essentielles d\'agrumes', 'Conservateurs'],
    conditionnement: ['5 L', '1 L', '500 mL'],
    modeUtilisation: [
      'Verser quelques mL dans le diffuseur ou le seau d\'entretien',
      'Peut être utilisé en pulvérisation directe dilué à 10%',
      'Pour les sols : diluer 50 mL dans 5 L d\'eau',
    ],
    tags: ['désodorisant', 'ambiance', 'citron', 'parfum professionnel'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'AIR-FRESH-LAV',
    name: "Désodorisant d'ambiance",
    range: 'detergent',
    category: 'detergent',
    scent: 'Lavande',
    description:
      "Désodorisant liquide professionnel à la lavande pour assainir et parfumer les espaces intérieurs. Sa formule neutralise les mauvaises odeurs et diffuse un parfum apaisant et durable. Le parfum lavande particulièrement apprécié dans les environnements de soin et de bien-être.",
    indications: [
      "Désodorisation des locaux professionnels",
      'Espaces de soin et de bien-être',
      'Hôtels, restaurants, bureaux',
      'Sanitaires et vestiaires',
    ],
    composition: ['Eau purifiée', 'Tensioactifs non ioniques', 'Parfum lavande', 'Huile essentielle de lavande', 'Conservateurs'],
    conditionnement: ['5 L', '1 L', '500 mL'],
    modeUtilisation: [
      'Verser quelques mL dans le diffuseur ou le seau d\'entretien',
      'Peut être utilisé en pulvérisation directe dilué à 10%',
      'Pour les sols : diluer 50 mL dans 5 L d\'eau',
    ],
    tags: ['désodorisant', 'ambiance', 'lavande', 'parfum professionnel'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'BETA-CLEANER',
    name: 'Détachant des taches d\'iode',
    range: 'detergent',
    category: 'detergent',
    description:
      'Détachant professionnel spécialisé pour l\'élimination des taches d\'iode sur les textiles, les surfaces et les équipements. Formulé pour une action rapide et efficace même sur les taches anciennes. Indispensable dans les milieux hospitaliers, les laboratoires et les industries pharmaceutiques.',
    indications: [
      'Élimination des taches d\'iode sur le linge',
      'Nettoyage des surfaces et équipements tachés par la Bétadine',
      'Milieux hospitaliers et laboratoires',
    ],
    composition: ['Eau purifiée', 'Thiosulfate de sodium', 'Tensioactifs', 'Agent stabilisant'],
    conditionnement: ['500 mL', '100 mL'],
    modeUtilisation: [
      'Appliquer directement sur la tache fraîche',
      'Laisser agir 2 à 5 minutes',
      'Frotter doucement puis rincer abondamment',
      'Pour les taches anciennes, renouveler l\'opération',
      'Tester sur une zone non visible avant utilisation sur surfaces délicates',
    ],
    tags: ['détachant', 'iode', 'bétadine', 'hospitalier', 'laboratoire'],
    isHauteGamme: false,
    isActive: true,
  },

  // ── Range III: Produits désinfectants (9 SKUs) ──
  {
    code: 'STERI-LINGE',
    name: 'Lave-linge désinfectant pour machine à laver',
    range: 'disinfectant',
    category: 'desinfectant',
    scent: 'Citron',
    description:
      'Lave-linge désinfectant professionnel pour l\'hygiène du linge en collectivités. Sa formule associe détergence et désinfection pour éliminer les micro-organismes pathogènes du linge lors du cycle de lavage. Particulièrement recommandé pour le linge des établissements de santé, des Ehpad et des industries agroalimentaires.',
    indications: [
      'Désinfection du linge en machine',
      'Linge hospitalier et médico-social',
      'Linge de restauration et hôtellerie',
      'Industrie agroalimentaire',
    ],
    composition: ['Eau purifiée', 'Tensioactifs', 'Acide peracétique', 'Peroxyde d\'hydrogène', 'Agent stabilisant', 'Parfum citron'],
    conditionnement: ['5 L'],
    modeUtilisation: [
      'Verser 100 mL dans le compartiment lessive',
      'Lancer un cycle à 60°C minimum',
      'Pour une désinfection renforcée, utiliser 150 mL',
      'Ne pas mélanger avec d\'autres produits contenant de l\'eau de Javel',
    ],
    microbiologie: {
      germes: '< 10 UFC/mL (ISO 21149)',
      levures: '< 10 UFC/mL (ISO 16212)',
      escherichiaColi: 'Absence dans 1 mL (ISO 21150)',
      pseudomonasAeruginosa: 'Absence dans 1 mL (ISO 22717)',
      staphylococcusAureus: 'Absence dans 1 mL (ISO 22718)',
      candidaAlbicans: 'Absence dans 1 mL (ISO 18416)',
      conclusion:
        'Qualité bactériologique satisfaisante. Conforme à l\'arrêté du 21/10/2019 (JO N°16 du 24 mars 2020).',
    },
    tags: ['lave-linge désinfectant', 'linge', 'citron', 'désinfection textile', 'hospitalier'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'PRE-DESINF-CHIR',
    name: 'Savon pré-désinfectant des instruments chirurgicaux',
    range: 'disinfectant',
    category: 'desinfectant',
    description:
      'Savon pré-désinfectant pour le nettoyage initial des instruments chirurgicaux avant stérilisation. Sa formulation détergente et désinfectante réduit la charge microbienne et élimine les résidus organiques. Conforme aux protocoles de traitement des dispositifs médicaux réutilisables.',
    indications: [
      'Pré-désinfection des instruments chirurgicaux',
      'Nettoyage initial avant stérilisation',
      'Blocs opératoires et stérilisation centrale',
    ],
    composition: ['Eau purifiée', 'Tensioactifs anioniques', 'Tensioactifs non ioniques', 'Aldéhyde glutarique', 'Agents anticorrosion', 'Parfum'],
    conditionnement: ['5 L', '1 L'],
    modeUtilisation: [
      'Diluer le produit à 2% dans de l\'eau tiède',
      'immerger les instruments pendant 15 minutes',
      'Brosser si nécessaire',
      'Rincer abondamment à l\'eau stérile',
      'Procéder à la stérilisation selon le protocole établi',
    ],
    microbiologie: {
      germes: '< 10 UFC/mL (ISO 21149)',
      levures: '< 10 UFC/mL (ISO 16212)',
      escherichiaColi: 'Absence dans 1 mL (ISO 21150)',
      pseudomonasAeruginosa: 'Absence dans 1 mL (ISO 22717)',
      staphylococcusAureus: 'Absence dans 1 mL (ISO 22718)',
      candidaAlbicans: 'Absence dans 1 mL (ISO 18416)',
      conclusion:
        'Qualité bactériologique satisfaisante. Conforme à l\'arrêté du 21/10/2019 (JO N°16 du 24 mars 2020).',
    },
    tags: ['pré-désinfectant', 'instruments chirurgicaux', 'stérilisation', 'bloc opératoire'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'DESINF-CHIR',
    name: 'Pré-désinfectant des instruments chirurgicaux',
    range: 'disinfectant',
    category: 'desinfectant',
    description:
      'Solution pré-désinfectante prête à l\'emploi pour les instruments chirurgicaux. Formulée pour une action rapide sur les bactéries, virus et champignons. Utilisée en immersion immédiate après usage pour sécuriser la manipulation des instruments avant leur nettoyage approfondi.',
    indications: [
      'Immersion immédiate des instruments après usage',
      'Réduction de la charge microbienne avant nettoyage',
      'Protection du personnel lors de la manipulation',
    ],
    composition: ['Eau purifiée', 'Chlorure de didécyldiméthylammonium', 'Tensioactifs', 'Anticorrosion', 'Colorant'],
    conditionnement: ['5 L', '1 L'],
    modeUtilisation: [
      'Plonger les instruments dans la solution immédiatement après usage',
      'Laisser agir 15 minutes minimum',
      'Retirer et procéder au nettoyage selon le protocole',
      'Renouveler le bain quotidiennement',
    ],
    tags: ['pré-désinfectant', 'instruments', 'chirurgicaux', 'immersion'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'DESINF-CHIR-CONC',
    name: 'Pré-désinfectant concentré des instruments chirurgicaux',
    range: 'disinfectant',
    category: 'desinfectant',
    description:
      'Pré-désinfectant concentré pour le traitement des instruments chirurgicaux. Sa formulation concentrée permet une utilisation économique adaptée aux grands volumes. Actif sur un large spectre de micro-organismes, il garantit une pré-désinfection efficace avant les phases de nettoyage et de stérilisation.',
    indications: [
      'Pré-désinfection des instruments en milieu hospitalier',
      'Grands volumes d\'instruments',
      'Centres de stérilisation',
    ],
    composition: ['Eau purifiée', 'Chlorure de didécyldiméthylammonium', 'Tensioactifs', 'Anticorrosion', 'Colorant'],
    conditionnement: ['5 L', '1 L'],
    modeUtilisation: [
      'Diluer à 1% dans de l\'eau',
      'Immerger les instruments pendant 15 minutes',
      'Rincer et procéder à la stérilisation',
      'Respecter les dosages pour une efficacité optimale',
    ],
    tags: ['pré-désinfectant concentré', 'instruments chirurgicaux', 'stérilisation'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'DESINF-MULTI-SURF',
    name: 'Désinfectant multi-surface',
    range: 'disinfectant',
    category: 'desinfectant',
    description:
      'Désinfectant multi-surface prêt à l\'emploi pour l\'entretien des surfaces dans les établissements de santé, les collectivités et les industries. Efficace contre les bactéries, virus et champignons. Compatible avec la plupart des surfaces dures (carrelage, inox, verre, plastique, stratifié).',
    indications: [
      'Désinfection des surfaces de travail',
      'Entretien des paillasses de laboratoire',
      'Désinfection des plans de travail en restauration',
      'Surfaces en milieu de soins',
    ],
    composition: ['Eau purifiée', 'Alcool benzylique', 'Chlorure de benzalkonium', 'Tensioactifs', 'Parfum'],
    conditionnement: ['5 L', '1 L'],
    modeUtilisation: [
      'Pulvériser sur la surface à traiter',
      'Laisser agir 5 minutes',
      'Essuyer avec un chiffon propre ou une lingette',
      'Ne pas rincer pour une action prolongée',
      'Tester sur une zone peu visible avant première utilisation',
    ],
    microbiologie: {
      germes: '< 10 UFC/mL (ISO 21149)',
      levures: '< 10 UFC/mL (ISO 16212)',
      escherichiaColi: 'Absence dans 1 mL (ISO 21150)',
      pseudomonasAeruginosa: 'Absence dans 1 mL (ISO 22717)',
      staphylococcusAureus: 'Absence dans 1 mL (ISO 22718)',
      candidaAlbicans: 'Absence dans 1 mL (ISO 18416)',
      conclusion:
        'Qualité bactériologique satisfaisante. Conforme à l\'arrêté du 21/10/2019 (JO N°16 du 24 mars 2020).',
    },
    tags: ['désinfectant', 'multi-surface', 'surfaces', 'entretien professionnel'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'DESINF-SURF-CONC',
    name: 'Désinfectant de surface concentré',
    range: 'disinfectant',
    category: 'desinfectant',
    description:
      'Désinfectant concentré pour le nettoyage et la désinfection des surfaces en milieu professionnel. Sa formulation concentrée offre un excellent rapport qualité-prix pour les grands volumes. Actif sur un large spectre microbien, il répond aux exigences des protocoles d\'hygiène les plus stricts.',
    indications: [
      'Désinfection des sols et surfaces en collectivités',
      'Hôpitaux, cliniques, Ehpad',
      'Industrie agroalimentaire',
      'Établissements scolaires et sportifs',
    ],
    composition: ['Eau purifiée', 'Chlorure de benzalkonium', 'Tensioactifs', 'Séquestrant', 'Parfum'],
    conditionnement: ['5 L', '1 L'],
    modeUtilisation: [
      'Diluer à 0,5% - 2% selon le niveau de désinfection requis',
      'Appliquer à la serpillière ou au pulvérisateur',
      'Laisser agir 10 minutes',
      'Renouveler selon le protocole d\'hygiène établi',
    ],
    tags: ['désinfectant concentré', 'surfaces', 'sols', 'professionnel'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'DVA',
    name: 'Désinfectant par voie aérienne (DVA)',
    range: 'disinfectant',
    category: 'desinfectant',
    description:
      'Désinfectant par voie aérienne pour l\'assainissement de l\'air et des surfaces en milieu clos. Utilisé en brumisation ou nébulisation, il permet de traiter les volumes d\'air et les surfaces inaccessible. Particulièrement efficace pour la désinfection terminale des chambres, des salles d\'opération, des laboratoires et des espaces de stockage.',
    indications: [
      'Désinfection de l\'air en milieu clos',
      'Assainissement après contamination',
      'Traitement des salles d\'opération et laboratoires',
      'Désinfection des espaces de stockage pharmaceutique',
    ],
    composition: ['Eau purifiée', 'Peroxyde d\'hydrogène', 'Acide peracétique', 'Stabilisants'],
    conditionnement: ['5 L', '1 L'],
    modeUtilisation: [
      'Vider la pièce de tout occupant',
      'Utiliser un nébulisateur professionnel',
      'Respecter le dosage recommandé (10 mL par m³)',
      'Laisser agir 30 minutes minimum',
      'Aérer abondamment avant réoccupation',
      'Porter un équipement de protection lors de l\'application',
    ],
    microbiologie: {
      germes: '< 10 UFC/m³ (ISO 21149)',
      levures: '< 10 UFC/m³ (ISO 16212)',
      escherichiaColi: 'Absence (ISO 21150)',
      pseudomonasAeruginosa: 'Absence (ISO 22717)',
      staphylococcusAureus: 'Absence (ISO 22718)',
      candidaAlbicans: 'Absence (ISO 18416)',
      conclusion:
        'Qualité bactériologique satisfaisante. Conforme à l\'arrêté du 21/10/2019 (JO N°16 du 24 mars 2020).',
    },
    tags: ['désinfectant', 'voie aérienne', 'DVA', 'nébulisation', 'air'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'NET-DESINF-MED',
    name: 'Solution nettoyante et désinfectante pour équipements médicaux',
    range: 'disinfectant',
    category: 'desinfectant',
    description:
      'Solution bi-action nettoyante et désinfectante pour les équipements médicaux non-invasifs. Sa formulation combinée permet de nettoyer et désinfecter en une seule opération les dispositifs médicaux, les surfaces des équipements et le mobilier médical. Compatible avec la plupart des matériaux médicaux.',
    indications: [
      'Nettoyage et désinfection des équipements médicaux',
      'Entretien du mobilier médical',
      'Désinfection des dispositifs médicaux non critiques',
    ],
    composition: ['Eau purifiée', 'Alcool isopropylique', 'Chlorure de benzalkonium', 'Tensioactifs', 'Anticorrosion'],
    conditionnement: ['5 L', '1 L'],
    modeUtilisation: [
      'Appliquer sur la surface à l\'aide d\'un chiffon non tissé',
      'Laisser agir 5 minutes',
      'Essuyer avec un chiffon propre',
      'Ne pas rincer',
      'Respecter les recommandations du fabricant d\'équipement',
    ],
    tags: ['nettoyant', 'désinfectant', 'équipements médicaux', 'hospitalier'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'DESINF-CHIR-MED',
    name: 'Désinfectant d\'instruments chirurgicaux et médicaux',
    range: 'disinfectant',
    category: 'desinfectant',
    description:
      'Désinfectant de haut niveau pour les instruments chirurgicaux et médicaux thermosensibles. Actif sur l\'ensemble du spectre microbien incluant les bactéries, virus enveloppés et non-enveloppés, champignons et mycobactéries. Alternative à la stérilisation à la vapeur pour les instruments ne supportant pas la chaleur.',
    indications: [
      'Désinfection de haut niveau des instruments thermosensibles',
      'Endoscopes et sondes',
      'Instruments de microchirurgie',
      'Matériel d\'anesthésie et de réanimation',
    ],
    composition: ['Eau purifiée', 'Acide peracétique', 'Peroxyde d\'hydrogène', 'Anticorrosion', 'Stabilisants'],
    conditionnement: ['5 L', '1 L'],
    modeUtilisation: [
      'Nettoyer soigneusement les instruments avant désinfection',
      'Immerger complètement dans la solution',
      'Respecter le temps de contact (10-30 minutes selon le niveau)',
      'Rincer à l\'eau stérile',
      'Sécher et conditionner en emballage stérile',
      'Renouveler le bain selon la fréquence d\'utilisation',
    ],
    tags: ['désinfectant', 'instruments chirurgicaux', 'haut niveau', 'thermosensible'],
    isHauteGamme: false,
    isActive: true,
  },

  // ── Range IV: Produits d'entretien pour inox (3 SKUs) ──
  {
    code: 'ANTIROUILLE',
    name: 'Antirouille pour surfaces et sols',
    range: 'inox',
    category: 'inox',
    description:
      'Antirouille professionnel pour le traitement des surfaces et sols en inox et métaux ferreux. Sa formule chimique élimine par dissolution les traces de rouille, la corrosion superficielle et les dépôts d\'oxydation. Redonne l\'aspect neuf aux surfaces métalliques sans les dégrader.',
    indications: [
      'Élimination de la rouille sur les surfaces inox',
      'Traitement des sols industriels',
      'Restauration de surfaces métalliques oxydées',
      'Préparation de surfaces avant soudure ou peinture',
    ],
    composition: ['Eau purifiée', 'Acide phosphorique', 'Tensioactifs', 'Inhibiteur de corrosion', 'Épaississant'],
    conditionnement: ['5 L', '1 L'],
    modeUtilisation: [
      'Appliquer sur la surface rouillée à l\'aide d\'un pinceau ou pulvérisateur',
      'Laisser agir 10 à 20 minutes selon l\'épaisseur de la rouille',
      'Frotter avec une brosse si nécessaire',
      'Rincer abondamment à l\'eau claire',
      'Sécher soigneusement',
      'Porter des gants et des lunettes de protection',
    ],
    tags: ['antirouille', 'inox', 'détartrant', 'corrosion', 'métal'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'RENOV-INOX',
    name: "Rénovateur d'inox (bain de trempage)",
    range: 'inox',
    category: 'inox',
    description:
      'Rénovateur d\'inox en bain de trempage pour le traitement en profondeur des pièces et équipements en acier inoxydable. Élimine les oxydations thermiques, les dépôts de calamine et les marques de soudure. Redonne la passivation naturelle de l\'inox et son aspect brillant d\'origine.',
    indications: [
      'Rénovation des pièces inox après soudure',
      'Désoxydation des équipements de cuisine professionnelle',
      'Entretien du matériel agroalimentaire',
      'Traitement des cuves et réservoirs inox',
    ],
    composition: ['Eau purifiée', 'Acide nitrique', 'Acide fluorhydrique', 'Tensioactifs', 'Inhibiteur'],
    conditionnement: ['5 L', '1 L'],
    modeUtilisation: [
      'Préparer un bain de trempage en diluant le produit à 10-20%',
      'Immerger les pièces pendant 15 à 30 minutes',
      'Retirer et rincer abondamment à l\'eau déminéralisée',
      'Sécher immédiatement pour éviter les traces',
      'Ne pas utiliser sur les surfaces alimentaires sans rinçage approfondi',
      'Porter un équipement de protection complet',
    ],
    tags: ['rénovateur inox', 'bain trempage', 'désoxydant', 'acier inoxydable'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'P-N-D',
    name: "Polish d'inox",
    range: 'inox',
    category: 'inox',
    description:
      'Polish d\'inox professionnel pour l\'entretien courant et la brillance des surfaces en acier inoxydable. Sa formule non abrasive nettoie, lustre et protège les surfaces inox. Laisse un film protecteur anti-empreintes et anti-corrosion. Idéal pour les plans de travail, éviers, comptoirs et équipements de cuisine.',
    indications: [
      'Entretien et brillance des surfaces inox',
      'Protection anti-empreintes',
      'Cuisines professionnelles et hôtellerie',
      'Équipements médicaux et de laboratoire',
    ],
    composition: ['Eau purifiée', 'Huiles de silicone', 'Tensioactifs', 'Agent lustrant', 'Parfum'],
    conditionnement: ['500 mL'],
    modeUtilisation: [
      'Agiter avant usage',
      'Pulvériser une fine brume sur la surface',
      'Essuyer avec un chiffon doux et non pelucheux',
      'Polir dans le sens du brossage pour un fini sans traces',
      'Renouveler selon la fréquence d\'utilisation',
    ],
    tags: ['polish inox', 'brillance', 'nettoyant inox', 'protection surfaces'],
    isHauteGamme: false,
    isActive: true,
  },

  // ── Range V: Divers (3 SKUs) ──
  {
    code: 'EAU-DISTILLEE',
    name: 'Eau distillée (double osmose + adoucisseur)',
    range: 'misc',
    category: 'misc',
    description:
      'Eau distillée de haute pureté obtenue par double osmose inverse et adoucissement. Conductivité inférieure à 5 µS/cm. Idéale pour la dilution des concentrés, la préparation des solutions pharmaceutiques, l\'alimentation des autoclaves et les laboratoires. Conditionnée dans des contenants garantissant sa pureté.',
    indications: [
      'Dilution de produits concentrés',
      'Préparation de solutions pharmaceutiques',
      'Alimentation des autoclaves et stérilisateurs',
      'Laboratoires d\'analyses et de recherche',
      'Entretien des batteries et circuits de refroidissement',
    ],
    composition: ['Eau purifiée par double osmose inverse', 'Conductivité < 5 µS/cm', 'pH neutre (6,5 - 7,5)'],
    conditionnement: ['1 L', '5 L'],
    modeUtilisation: [
      'Utiliser directement selon le besoin',
      'Conserver dans un endroit propre à l\'abri de la lumière',
      'Ne pas utiliser pour l\'injection',
    ],
    tags: ['eau distillée', 'osmose inverse', 'purifiée', 'laboratoire', 'pharmaceutique'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'GLYCERINE',
    name: 'Glycérine végétale (glycérol 99,5%)',
    range: 'misc',
    category: 'misc',
    description:
      'Glycérine végétale de haute pureté (glycérol 99,5%) issue de la saponification d\'huiles végétales. Utilisée comme excipient, humectant, solvant et agent de texture dans les formulations pharmaceutiques, cosmétiques et industrielles. Conforme à la Pharmacopée Européenne.',
    indications: [
      'Excipient pour préparations pharmaceutiques',
      'Base pour formulations cosmétiques maison',
      'Humectant pour l\'industrie agroalimentaire',
      'Agent plastifiant et lubrifiant technique',
      'Conservation de solutions biologiques',
    ],
    composition: ['Glycérol 99,5%', 'Eau purifiée qsp 100%'],
    conditionnement: ['5 kg', '1 kg', '500 g', '60 mL'],
    modeUtilisation: [
      'Utiliser selon les besoins de la formulation',
      'Peut être diluée dans l\'eau ou l\'alcool',
      'Se conserve à température ambiante',
      'Bien refermer après usage pour éviter l\'humidification',
    ],
    tags: ['glycérine', 'glycérol', 'végétale', 'pharmaceutique', 'cosmétique'],
    isHauteGamme: false,
    isActive: true,
  },
  {
    code: 'GEL-ECHO',
    name: 'Gel échographique (ultrasonique) — bleu ou transparent',
    range: 'misc',
    category: 'misc',
    description:
      'Gel de contact pour échographie et usages ultrasoniques. Sa formulation aqueuse garantit une transmission optimale des ultrasons sans bulles d\'air. Hypoallergénique, sans parfum, sans colorant, il respecte les peaux les plus sensibles. Disponible en version bleue ou transparente.',
    indications: [
      'Examen échographique médical',
      'Échographies obstétricales et vasculaires',
      'Physiothérapie et ultrasonothérapie',
      'Contrôles non destructifs par ultrasons',
    ],
    composition: ['Eau purifiée', 'Carbomère', 'Propylène glycol', 'Triéthanolamine', 'Méthylparabène', 'Colorant (version bleue)'],
    conditionnement: ['5 L', '225 mL'],
    modeUtilisation: [
      'Appliquer une quantité suffisante sur la zone à examiner',
      'Étaler uniformément avec la sonde',
      'Après examen, essuyer l\'excédent avec un linge doux',
      'Nettoyer à l\'eau tiède si nécessaire',
      'Conserver à température ambiante, à l\'abri de la chaleur',
    ],
    tags: ['gel échographique', 'ultrason', 'échographie', 'gel de contact', 'médical'],
    isHauteGamme: false,
    isActive: true,
  },
];

export async function seedProducts(): Promise<number> {
  await connectDB();

  let count = 0;

  for (const data of products) {
    const slug = slugify(data.name);
    try {
      await ProductModel.findOneAndUpdate(
        { code: data.code },
        { ...data, slug },
        { upsert: true, new: true }
      );
      count++;
      console.log(`  [PRODUCT] ✓ ${data.code} — ${data.name}`);
    } catch (err) {
      console.error(`  [PRODUCT] ✗ ${data.code} — ${err}`);
    }
  }

  console.log(`\n[PRODUCT] Seeded ${count}/${products.length} products\n`);
  return count;
}
