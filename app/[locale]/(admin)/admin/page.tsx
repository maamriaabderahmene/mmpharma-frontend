import type { Metadata } from 'next';
import { StatCard } from '@/components/admin/StatCard';
import { buildPageMetadata } from '@/lib/seo/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    section: 'admin',
    path: '/admin',
    title: 'Tableau de bord',
    description: 'Pilotage centralisé du catalogue, des contenus et des opérations.',
  });
}

export default function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7A8694]">Admin cockpit</p>
        <h1 className="text-[36px] font-semibold tracking-[-0.02em] text-[#062A4F]">Operational Overview</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active products" value="128" delta="+9 in last 30 days" />
        <StatCard label="Pending orders" value="24" delta="-3 since yesterday" />
        <StatCard label="New users" value="57" delta="+12 this week" />
        <StatCard label="Hidden SEO pages" value="1,204" delta="+48 generated this week" />
      </div>

      <section className="rounded-xl border border-[#E1E7EE] bg-white p-5">
        <h2 className="mb-4 text-xl font-semibold text-[#062A4F]">Recent activity</h2>
        <ul className="space-y-2 text-sm text-[#3F4A57]">
          <li>• Product SKU MM-HYDRO-5L updated by admin@mmpharma.ma</li>
          <li>• Event “Hygiène Hôtellerie 2026” published</li>
          <li>• Hidden SEO regenerated for /products/hydro-clean</li>
          <li>• 3 quote requests moved to priority queue</li>
        </ul>
      </section>
    </section>
  );
}
