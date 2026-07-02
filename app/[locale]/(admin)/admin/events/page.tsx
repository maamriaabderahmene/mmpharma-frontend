import Link from 'next/link';
import { EmptyState } from '@/components/admin/EmptyState';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminEventsPage({ params }: Props) {
  const { locale } = await params;
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[#062A4F]">Events</h1>
        <Link
          href={`/${locale}/admin/events/new`}
          className="inline-flex h-11 items-center rounded-md bg-[#062A4F] px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white"
        >
          New event
        </Link>
      </div>
      <EmptyState
        title="Event module initialized"
        description="Event management shell is ready for scheduling and registrations."
      />
    </section>
  );
}
