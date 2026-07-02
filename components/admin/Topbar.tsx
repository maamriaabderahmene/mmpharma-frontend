type Props = {
  title: string;
  subtitle?: string;
  userLabel: string;
};

export function Topbar({ title, subtitle, userLabel }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#E1E7EE] bg-[#FAFBFC]/95 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7A8694]">MM Pharma · Admin</p>
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#062A4F]">{title}</h1>
          {subtitle ? <p className="text-sm text-[#3F4A57]">{subtitle}</p> : null}
        </div>
        <div className="inline-flex h-11 items-center rounded-md border border-[#E1E7EE] bg-white px-3 text-sm text-[#3F4A57]">
          {userLabel}
        </div>
      </div>
    </header>
  );
}
