import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import RangeModel from '@/lib/server/db/models/Range';

const ranges = [
  {
    key: 'hygiene',
    label: 'Range I — Produits d\'hygiène et de nettoyage personnel',
    description:
      'Produits d\'hygiène des mains et de soins corporels : gels hydroalcooliques, savons liquides, solutions antiseptiques. Destinés aux professionnels de santé, aux industries, aux collectivités et au grand public. Formulations équilibrées pour une hygiène efficace au quotidien.',
    order: 1,
  },
  {
    key: 'detergent',
    label: 'Range II — Produits détergents et nettoyants à usage professionnel',
    description:
      'Solutions détergentes et nettoyantes concentrées pour les collectivités, l\'hôtellerie, la restauration et les établissements de santé. Efficacité professionnelle pour un entretien irréprochable des locaux et équipements.',
    order: 2,
  },
  {
    key: 'disinfectant',
    label: 'Range III — Produits désinfectants (textiles, surfaces, sols, instruments)',
    description:
      'Gamme complète de désinfectants pour les environnements critiques : textiles, surfaces, instruments chirurgicaux et médicaux. Conformes aux normes ISO et aux protocoles d\'hygiène les plus stricts.',
    order: 3,
  },
  {
    key: 'inox',
    label: 'Range IV — Produits d\'entretien pour inox',
    description:
      'Solutions spécialisées pour l\'entretien, la rénovation et la protection des surfaces en acier inoxydable. Antirouille, rénovateur et polish pour une brillance durable.',
    order: 4,
  },
  {
    key: 'misc',
    label: 'Range V — Divers',
    description:
      'Produits complémentaires : eau distillée de haute pureté, glycérine végétale 99,5%, gel échographique. Solutions essentielles pour les laboratoires, les pharmacies et les établissements de soins.',
    order: 5,
  },
];

export async function seedCategories(): Promise<number> {
  await connectDB();

  let count = 0;

  for (const data of ranges) {
    try {
      await RangeModel.findOneAndUpdate(
        { key: data.key },
        { ...data },
        { upsert: true, new: true }
      );
      count++;
      console.log(`  [RANGE] ✓ ${data.key} — ${data.label}`);
    } catch (err) {
      console.error(`  [RANGE] ✗ ${data.key} — ${err}`);
    }
  }

  console.log(`\n[RANGE] Seeded ${count}/${ranges.length} product ranges\n`);
  return count;
}
