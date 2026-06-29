import { NextResponse } from 'next/server';
import { withApi } from '@/lib/server/api/withApi';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REGIONS = [
  { value: 'casablanca-settat', label: 'Casablanca-Settat' },
  { value: 'rabat-sale-kenitra', label: 'Rabat-Salé-Kénitra' },
  { value: 'marrakech-safi', label: 'Marrakech-Safi' },
  { value: 'fes-meknes', label: 'Fès-Meknès' },
  { value: 'tanger-tetouan-al-hoceima', label: 'Tanger-Tétouan-Al Hoceïma' },
  { value: 'souss-massa', label: 'Souss-Massa' },
  { value: 'oriental', label: "L'Oriental" },
  { value: 'beni-mellal-khenifra', label: 'Béni Mellal-Khénifra' },
  { value: 'draa-tafilalet', label: 'Drâa-Tafilalet' },
  { value: 'laayoune-sakia-el-hamra', label: 'Laâyoune-Sakia El Hamra' },
  { value: 'dakhla-oued-ed-dahab', label: 'Dakhla-Oued Ed-Dahab' },
  { value: 'guelmim-oued-noun', label: 'Guelmim-Oued Noun' },
];

export const GET = withApi(async () => {
  return NextResponse.json({ data: REGIONS });
});
