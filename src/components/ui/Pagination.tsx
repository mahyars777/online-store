interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const base = "min-w-10 rounded-lg border px-3 py-2 text-sm transition";
  const normal = "border-gray-200 bg-white hover:border-indigo-600";
  const disabled = "disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      aria-label="صفحه‌بندی"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={`${base} ${normal} ${disabled}`}
      >
        قبلی
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${base} ${p === page ? "border-indigo-600 bg-indigo-600 text-white" : normal}`}
        >
          {p.toLocaleString("fa-IR")}
        </button>
      ))}

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`${base} ${normal} ${disabled}`}
      >
        بعدی
      </button>
    </nav>
  );
}
