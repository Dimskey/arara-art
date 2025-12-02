"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/langContext";

export default function SearchBox() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    async function fetchData() {
      const res = await fetch(`/api/search?q=${query}&lang=${lang}`, {
        signal: controller.signal,
      });
      const data = await res.json();
      setResults(data);
    }

    const delay = setTimeout(fetchData, 400); // debounce 400ms

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query, lang]);

  return (
    <div className="relative">
      <input
        type="text"
        className="px-3 py-2 w-full border rounded-md bg-[var(--color-background)] text-sm"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-[var(--color-background)] border rounded-md shadow-lg">
          {results.map((item: any) => (
            <Link
              key={item._id}
              href={`/${lang}/product/${item.slug}`}
              className="flex items-center gap-3 p-3 border-b hover:bg-[var(--color-muted)]"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-10 h-10 object-cover "
                />
              )}
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
