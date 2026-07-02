import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/metadata';

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, section: 'admin', path: '/admin/articles/edit', title: 'Modifier article — Admin' });
}

export default async function EditArticlePage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-3xl">
      <Link href={`/${locale}/admin/articles`} className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7A8694] hover:text-[#062A4F]">← Retour</Link>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#062A4F]">Modifier l&apos;article</h1>
      <p className="mt-6 text-sm text-[#7A8694]">Module en cours de développement.</p>
    </div>
  );
}
