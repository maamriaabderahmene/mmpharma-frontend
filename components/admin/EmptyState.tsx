import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({ title, description, actionLabel, actionHref }: Props) {
  return (
    <div className="rounded-xl border border-dashed border-[#C5CFD9] bg-white px-6 py-12 text-center">
      <p className="mb-2 text-xl font-semibold text-[#062A4F]">{title}</p>
      <p className="mx-auto max-w-xl text-sm text-[#3F4A57]">{description}</p>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-6 inline-flex h-11 items-center rounded-md bg-[#062A4F] px-4 text-[11px] uppercase tracking-[0.2em] text-white hover:bg-[#0A427C]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
