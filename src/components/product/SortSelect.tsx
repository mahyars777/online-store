import type { ProductSort } from "@/types/product";

interface SortSelectProps {
  value?: ProductSort;
  onChange: (sort?: ProductSort) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange((e.target.value || undefined) as ProductSort | undefined)}
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
    >
      <option value="">پیش‌فرض</option>
      <option value="price_asc">ارزان‌ترین</option>
      <option value="price_desc">گران‌ترین</option>
    </select>
  );
}
