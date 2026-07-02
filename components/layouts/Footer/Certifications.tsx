const CERTIFICATIONS = ['ISO 9001', 'JO N°16 · 2020', 'Made in Morocco'];

export function Certifications() {
  return (
    <div className="flex flex-wrap gap-2">
      {CERTIFICATIONS.map((tag) => (
        <span
          key={tag}
          className="inline-flex h-9 items-center border border-[#F2B135]/40 px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#F2B135]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
