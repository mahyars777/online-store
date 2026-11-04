"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const [text, setText] = useState(value);
  const debouncedText = useDebounce(text, 400).trim();

  useEffect(() => {
    if (debouncedText !== value) onChange(debouncedText);
    // فقط وقتی متن debounce‌شده تغییر کرد اجرا بشه، نه با تغییر URL
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  return (
    <input
      type="search"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="جستجوی محصول..."
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-600"
    />
  );
}
