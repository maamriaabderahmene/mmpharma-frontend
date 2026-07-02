'use client';

type Props = {
  value?: string;
};

export function Editor({ value = '' }: Props) {
  return (
    <div className="min-h-40 rounded-xl border border-[#E1E7EE] bg-white p-4 text-sm text-[#3F4A57]">
      {value || 'Rich editor surface is ready for TipTap integration.'}
    </div>
  );
}
