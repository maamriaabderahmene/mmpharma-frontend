import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, section: 'admin', path: '/admin/articles', title: 'Articles — Admin' });
}

export default async function AdminArticlesPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#F2B135]">N° 03 — Contenu</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#062A4F]">Articles</h1>
        </div>
        <Link href={`/${locale}/admin/articles/new`} className="inline-flex h-10 items-center rounded-lg bg-[#062A4F] px-4 text-sm font-medium text-white hover:bg-[#07305A]">
          + Nouvel article
        </Link>
      </div>
      <div className="rounded-xl border border-[#E1E7EE] bg-white p-12 text-center">
        <p className="text-sm text-[#7A8694]">Module articles — en cours de développement.</p>
      </div>
    </div>
  );
}
