type Props = {
  label: string;
  value: string;
  delta: string;
};

export function StatCard({ label, value, delta }: Props) {
  return (
    <article className="rounded-xl border border-[#E1E7EE] bg-white p-5">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7A8694]">{label}</p>
      <p className="text-[36px] font-semibold leading-none tracking-[-0.02em] text-[#062A4F]">{value}</p>
      <p className="mt-2 text-sm text-[#3F4A57]">{delta}</p>
    </article>
  );
}
