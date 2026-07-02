import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, section: 'admin', path: '/admin/users', title: 'Utilisateurs — Admin' });
}

export default async function AdminUsersPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#F2B135]">N° 06 — Comptes</p>
      <h1 className="mb-6 mt-1 text-2xl font-semibold tracking-tight text-[#062A4F]">Utilisateurs</h1>
      <div className="rounded-xl border border-[#E1E7EE] bg-white p-12 text-center">
        <p className="text-sm text-[#7A8694]">Module utilisateurs — en cours de développement.</p>
      </div>
    </div>
  );
}
