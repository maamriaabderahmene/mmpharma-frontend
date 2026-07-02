import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { safeSearch } from '@/lib/server/api/products.service';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, section: 'admin', path: '/admin/products', title: 'Produits — Admin' });
}

const rangeLabels: Record<string, string> = {
  hygiene: 'Hygiène',
  detergent: 'Détergent',
  disinfectant: 'Désinfectant',
  inox: 'Inox',
  misc: 'Divers',
};

export default async function AdminProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;

  const { products } = await safeSearch({
    page: sp.page ? Math.max(1, parseInt(sp.page, 10) || 1) : 1,
    limit: 20,
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#F2B135]">
            N° 02 — Catalogue
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#062A4F]">Produits</h1>
        </div>
        <Link
          href={`/${locale}/admin/products/new`}
          className="inline-flex h-10 items-center rounded-lg bg-[#062A4F] px-4 text-sm font-medium text-white hover:bg-[#07305A]"
        >
          + Nouveau produit
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E1E7EE] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#E1E7EE] bg-[#F2F5F8]">
            <tr>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Code</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Nom</th>
              <th className="hidden px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694] md:table-cell">Gamme</th>
              <th className="hidden px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694] lg:table-cell">Catégorie</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Statut</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E1E7EE]">
            {products.data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#7A8694]">
                  Aucun produit trouvé.
                </td>
              </tr>
            )}
            {products.data.map((product) => (
              <tr key={product.id} className="transition-colors hover:bg-[#F5F1E8]/40">
                <td className="px-4 py-3 font-mono text-xs text-[#7A8694]">{product.code}</td>
                <td className="px-4 py-3 font-medium text-[#062A4F]">{product.name}</td>
                <td className="hidden px-4 py-3 text-[#3F4A57] md:table-cell">
                  {rangeLabels[product.range] ?? product.range}
                </td>
                <td className="hidden px-4 py-3 text-[#7A8694] lg:table-cell">{product.category}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
                    product.isActive ? 'bg-green-50 text-[#16A37A]' : 'bg-red-50 text-[#D63A3A]'
                  }`}>
                    {product.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/${locale}/admin/products/${product.id}`}
                    className="rounded-md px-3 py-1.5 text-xs font-medium text-[#062A4F] transition hover:bg-[#F2F5F8]"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: products.totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/${locale}/admin/products?page=${page}`}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm transition ${
                page === products.page ? 'bg-[#062A4F] text-white' : 'text-[#3F4A57] hover:bg-[#F2F5F8]'
              }`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
