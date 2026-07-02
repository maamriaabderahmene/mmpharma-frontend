import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, section: 'admin', path: '/admin/seo', title: 'SEO — Admin' });
}

export default async function AdminSeoPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#F2B135]">N° 08 — Optimisation</p>
      <h1 className="mb-6 mt-1 text-2xl font-semibold tracking-tight text-[#062A4F]">SEO</h1>
      <div className="rounded-xl border border-[#E1E7EE] bg-white p-12 text-center">
        <p className="text-sm text-[#7A8694]">Module SEO — en cours de développement.</p>
      </div>
    </div>
  );
}
