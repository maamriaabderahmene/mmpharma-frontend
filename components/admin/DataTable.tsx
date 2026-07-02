import Link from 'next/link';

type Column<T> = {
  key: keyof T;
  label: string;
};

type Action<T> = {
  label: string;
  href: (row: T) => string;
};

type Props<T extends { id: string }> = {
  columns: Array<Column<T>>;
  data: T[];
  actions?: Array<Action<T>>;
};

export function DataTable<T extends { id: string }>({ columns, data, actions = [] }: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E1E7EE] bg-white">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-[#E1E7EE] bg-[#F5F1E8]">
            {columns.map((column) => (
              <th key={String(column.key)} className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#062A4F]">
                {column.label}
              </th>
            ))}
            {actions.length > 0 ? (
              <th className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[#062A4F]">Actions</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-[#E1E7EE] last:border-0 hover:bg-[#FAFBFC]">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-3 text-sm text-[#3F4A57]">
                  {String(row[column.key] ?? '')}
                </td>
              ))}
              {actions.length > 0 ? (
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-2">
                    {actions.map((action) => (
                      <Link
                        key={action.label}
                        href={action.href(row)}
                        className="inline-flex h-9 items-center rounded-md border border-[#E1E7EE] px-3 text-xs uppercase tracking-[0.18em] text-[#062A4F] hover:border-[#F2B135] hover:text-[#C58816]"
                      >
                        {action.label}
                      </Link>
                    ))}
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
