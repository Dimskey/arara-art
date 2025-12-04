"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/langContext";
import { Search, X } from "lucide-react";

interface SearchResult {
  _id: string;
  slug: string;
  title: string;
  imageUrl?: string;
}

export default function SearchBox() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${query}&lang=${lang}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setResults(data);
        setShowResults(true);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Search error:', error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    const delay = setTimeout(fetchData, 400); // debounce 400ms

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query, lang]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-accent)] opacity-50" />
        <input
          type="text"
          className="px-10 py-2 w-full border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          placeholder={lang === "id" ? "Cari produk..." : "Search products..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-accent)] opacity-50 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 mt-2 w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-md shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-[var(--color-accent)] opacity-60">
              {lang === "id" ? "Mencari..." : "Searching..."}
            </div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <Link
                key={item._id}
                href={`/${lang}/product/${item.slug}`}
                className="flex items-center gap-3 p-3 border-b border-[var(--color-border)] last:border-b-0  transition-colors"
                onClick={() => setShowResults(false)}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-[var(--color-muted)] rounded flex items-center justify-center text-xs opacity-50">
                    No Image
                  </div>
                )}
                <span className="text-sm">{item.title}</span>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3 opacity-20">🔍</div>
              <p className="text-sm text-[var(--color-accent)] opacity-60 mb-1">
                {lang === "id" ? "Tidak ada hasil" : "No results found"}
              </p>
              <p className="text-xs text-[var(--color-accent)] opacity-40">
                {lang === "id" 
                  ? `Tidak ada produk yang cocok dengan "${query}"`
                  : `No products match "${query}"`
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}