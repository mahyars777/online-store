"use client";

import { useState } from "react";

interface PriceFilterProps {
  min?: number;
  max?: number;
  onApply: (min?: number, max?: number) => void;
}

function parsePrice(text: string): number | undefined {
  const n = Number(text);
  return text.trim() === "" || !Number.isFinite(n) || n < 0 ? undefined : n;
}

export default function PriceFilter({ min, max, onApply }: PriceFilterProps) {
  const [minText, setMinText] = useState(min?.toString() ?? "");
  const [maxText, setMaxText] = useState(max?.toString() ?? "");

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-600";

  return (
    <div className="space-y-2">
      <input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder="حداقل قیمت (تومان)"
        value={minText}
        onChange={(e) => setMinText(e.target.value)}
        className={inputClass}
      />
      <input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder="حداکثر قیمت (تومان)"
        value={maxText}
        onChange={(e) => setMaxText(e.target.value)}
        className={inputClass}
      />
      <button
        onClick={() => onApply(parsePrice(minText), parsePrice(maxText))}
        className="w-full rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-700"
      >
        اعمال فیلتر قیمت
      </button>
    </div>
  );
}
