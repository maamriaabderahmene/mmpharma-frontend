import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { requireRole } from '@/lib/server/auth/guards';
import { UserRole } from '@/lib/shared/constants/UserRole';
import { ProductRangeValues } from '@/lib/shared/constants/ProductRange';
import { ProductCategoryValues } from '@/lib/shared/constants/ProductCategory';
import * as productsRepo from '@/lib/server/api/products.repo';

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, section: 'admin', path: '/admin/products/edit', title: 'Modifier produit — Admin' });
}

function isDbReachable(): boolean {
  return Boolean(process.env.MONGO_URI && process.env.MONGO_URI.length > 0);
}

export default async function EditProductPage({ params }: Props) {
  const { locale, id } = await params;
  await requireRole(UserRole.ADMIN, `/${locale}/auth/signin`);

  if (!isDbReachable()) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-[#E1E7EE] bg-white p-12 text-center">
          <p className="text-sm text-[#7A8694]">Base de données non disponible.</p>
          <Link href={`/${locale}/admin/products`} className="mt-4 inline-block text-sm font-medium text-[#062A4F] underline">← Retour</Link>
        </div>
      </div>
    );
  }

  let product: Awaited<ReturnType<typeof productsRepo.bySlug>>;
  try {
    product = await productsRepo.bySlug(id);
    if (!product) {
      product = await productsRepo.bySlug(decodeURIComponent(id));
    }
  } catch {
    product = null as unknown as Awaited<ReturnType<typeof productsRepo.bySlug>>;
  }

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link href={`/${locale}/admin/products`} className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7A8694] transition hover:text-[#062A4F]">
          ← Retour aux produits
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#062A4F]">Modifier — {product.name}</h1>
        <p className="mt-1 font-mono text-xs text-[#7A8694]">{product.code}</p>
      </div>

      <form action={`/${locale}/api/products/${product.slug}`} method="POST" className="space-y-6 rounded-xl border border-[#E1E7EE] bg-white p-6">
        <input type="hidden" name="_method" value="PUT" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Code produit</label>
            <input name="code" defaultValue={product.code} className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]" />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Nom</label>
            <input name="name" defaultValue={product.name} className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]" />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Gamme</label>
            <select name="range" defaultValue={product.range} className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]">
              {ProductRangeValues.map((r) => (<option key={r} value={r}>{r}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Catégorie</label>
            <select name="category" defaultValue={product.category} className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]">
              {ProductCategoryValues.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isActive" defaultChecked={product.isActive} className="h-4 w-4 rounded border-[#E1E7EE] accent-[#F2B135]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Actif</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isHauteGamme" defaultChecked={product.isHauteGamme} className="h-4 w-4 rounded border-[#E1E7EE] accent-[#F2B135]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Haute gamme</span>
            </label>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Description</label>
          <textarea name="description" rows={4} defaultValue={product.description} className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]" />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Parfum / Senteur</label>
          <input name="scent" defaultValue={product.scent ?? ''} className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]" />
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#E1E7EE] pt-5">
          <Link href={`/${locale}/admin/products`} className="rounded-lg px-4 py-2.5 text-sm text-[#3F4A57] transition hover:bg-[#F2F5F8]">Annuler</Link>
          <button type="submit" className="rounded-lg bg-[#062A4F] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#07305A]">Enregistrer</button>
        </div>
      </form>
    </div>
  );
}
