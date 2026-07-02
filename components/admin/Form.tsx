'use client';

type Props = {
  title: string;
  children: React.ReactNode;
};

export function Form({ title, children }: Props) {
  return (
    <section className="rounded-xl border border-[#E1E7EE] bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold text-[#062A4F]">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
