import Link from 'next/link';
import { DataTable } from '@/components/admin/DataTable';
import { EmptyState } from '@/components/admin/EmptyState';
import { safeSearch } from '@/lib/server/api/products.service';

type Props = {
  params: Promise<{ locale: string }>;
};

type Row = {
  id: string;
  code: string;
  name: string;
  range: string;
  status: string;
};

export default async function AdminProductsPage({ params }: Props) {
  const { locale } = await params;
  const result = await safeSearch({ page: 1, limit: 25 });
  const rows: Row[] = result.products.data.map((product) => ({
    id: product.id,
    code: product.code,
    name: product.name,
    range: product.range,
    status: product.isActive ? 'active' : 'inactive',
  }));

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7A8694]">Catalog management</p>
          <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[#062A4F]">Products</h1>
        </div>
        <Link
          href={`/${locale}/admin/products/new`}
          className="inline-flex h-11 items-center rounded-md bg-[#062A4F] px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white hover:bg-[#0A427C]"
        >
          New product
        </Link>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No products available"
          description="The product catalog is empty or the database is currently unavailable."
          actionLabel="Create product"
          actionHref={`/${locale}/admin/products/new`}
        />
      ) : (
        <DataTable<Row>
          columns={[
            { key: 'code', label: 'Code' },
            { key: 'name', label: 'Name' },
            { key: 'range', label: 'Range' },
            { key: 'status', label: 'Status' },
          ]}
          data={rows}
          actions={[{ label: 'Edit', href: (row) => `/${locale}/admin/products/${row.id}` }]}
        />
      )}
    </section>
  );
}
