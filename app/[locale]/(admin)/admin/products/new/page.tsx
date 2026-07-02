import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { requireRole } from '@/lib/server/auth/guards';
import { UserRole } from '@/lib/shared/constants/UserRole';
import { ProductRangeValues } from '@/lib/shared/constants/ProductRange';
import { ProductCategoryValues } from '@/lib/shared/constants/ProductCategory';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, section: 'admin', path: '/admin/products/new', title: 'Nouveau produit — Admin' });
}

export default async function NewProductPage({ params }: Props) {
  const { locale } = await params;
  await requireRole(UserRole.ADMIN, `/${locale}/auth/signin`);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link href={`/${locale}/admin/products`} className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7A8694] transition hover:text-[#062A4F]">
          ← Retour aux produits
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#062A4F]">Nouveau produit</h1>
        <p className="mt-1 text-sm text-[#7A8694]">Ajouter une nouvelle référence au catalogue.</p>
      </div>

      <form action={`/${locale}/api/products`} method="POST" className="space-y-6 rounded-xl border border-[#E1E7EE] bg-white p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Code produit</label>
            <input name="code" required className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]" placeholder="MMP-HYG-001" />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Nom</label>
            <input name="name" required className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]" placeholder="Gel nettoyant" />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Slug</label>
            <input name="slug" required className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]" placeholder="gel-nettoyant" />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Gamme</label>
            <select name="range" required className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]">
              <option value="">Sélectionner...</option>
              {ProductRangeValues.map((r) => (<option key={r} value={r}>{r}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Catégorie</label>
            <select name="category" required className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]">
              <option value="">Sélectionner...</option>
              {ProductCategoryValues.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isActive" defaultChecked className="h-4 w-4 rounded border-[#E1E7EE] accent-[#F2B135]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Actif</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isHauteGamme" className="h-4 w-4 rounded border-[#E1E7EE] accent-[#F2B135]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Haute gamme</span>
            </label>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Description</label>
          <textarea name="description" rows={4} className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]" placeholder="Description du produit..." />
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A8694]">Parfum / Senteur</label>
          <input name="scent" className="w-full rounded-lg border border-[#E1E7EE] px-3 py-2.5 text-sm text-[#062A4F] outline-none transition focus:border-[#F2B135] focus:ring-1 focus:ring-[#F2B135]" placeholder="Lavande, citron..." />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#E1E7EE] pt-5">
          <Link href={`/${locale}/admin/products`} className="rounded-lg px-4 py-2.5 text-sm text-[#3F4A57] transition hover:bg-[#F2F5F8]">Annuler</Link>
          <button type="submit" className="rounded-lg bg-[#062A4F] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#07305A]">Créer le produit</button>
        </div>
      </form>
    </div>
  );
}
