"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

interface CategoryData {
  category: string;
}

export default function CategoriesSection() {
  const params = useParams();
  const lang = (params.lang as string) || "en";
  
  const [categories, setCategories] = useState<string[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 8;

  useEffect(() => {
    let isMounted = true;
    
    async function fetchCategories() {
      try {
        // Query dengan filter language - SAMA SEPERTI allProductsQuery
        const categoriesQuery = `*[_type == "product" && language == $lang && defined(category)] {
          category
        }`;
        
        const data: CategoryData[] = await client.fetch(categoriesQuery, { lang });
        
        if (!isMounted) return;
        
        // Get unique categories
        const uniqueCategories = [...new Set(data.map(item => item.category))].sort();
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchCategories();
    
    return () => {
      isMounted = false;
    };
  }, [lang]);

  // Memoize pagination calculation
  const { totalPages, paginatedCategories } = useMemo(() => {
    const total = Math.ceil(categories.length / itemsPerPage);
    const paginated = categories.slice(
      activePage * itemsPerPage,
      (activePage + 1) * itemsPerPage
    );
    return { totalPages: total, paginatedCategories: paginated };
  }, [categories, activePage, itemsPerPage]);

  // Reset page ketika ganti bahasa
  useEffect(() => {
    setActivePage(0);
  }, [lang]);

  // Memoize page change handler
  const handlePageChange = useCallback((page: number) => {
    setActivePage(page);
  }, []);

  if (loading) {
    return (
      <section className="py-20 lg:py-28 border-t border-[var(--color-border)]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center">
            <p className="text-lg opacity-60">
              {lang === "id" ? "Memuat kategori..." : "Loading categories..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 border-t border-[var(--color-border)]/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-medium tracking-[0.25em]">
            {lang === "id" ? "KATEGORI" : "CATEGORIES"}
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="pb-10">
          {/* Mobile: Grid dengan Pagination */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:hidden">
            {paginatedCategories.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                lang={lang}
              />
            ))}
          </div>
          
          {/* Desktop: Show All */}
          <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-12">
            {categories.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                lang={lang}
              />
            ))}
          </div>
        </div>

        {/* Pagination - Only Mobile */}
        {totalPages > 1 && (
          <div className="lg:hidden flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === activePage
                    ? "bg-[var(--color-accent)]"
                    : "bg-[var(--color-border)] hover:bg-[var(--color-accent)]/50"
                }`}
                aria-label={`${lang === "id" ? "Halaman" : "Page"} ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Memoized Category Card Component
const CategoryCard = ({ category, lang }: { category: string; lang: string }) => {
  const slug = useMemo(() => category.toLowerCase().replace(/\s+/g, "-"), [category]);
  const iconPath = useMemo(() => getCategoryIconPath(slug), [slug]);

  return (
    <Link
      href={`/${lang}/product?category=${encodeURIComponent(category)}`}
      className="group flex flex-col items-center gap-4 transition-all"
      prefetch={false}
    >
      <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-colors bg-[var(--color-background)] flex items-center justify-center">
        <div className="relative w-12 h-12 lg:w-16 lg:h-16 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <Image
            src={iconPath}
            alt={category}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 128px, 192px"
            loading="lazy"
            unoptimized
          />
        </div>
      </div>
      <h3 className="text-sm lg:text-base font-medium tracking-wider text-center">
        {category}
      </h3>
    </Link>
  );
};

// Function untuk mendapatkan icon path berdasarkan kategori slug
function getCategoryIconPath(slug: string): string {
  const iconMap: Record<string, string> = {
    // Indonesian
    "bross": "/images/icons/Bross.svg",
    "kalung": "/images/icons/Kalung.svg",
    "peniti": "/images/icons/Peniti.svg",
    "gelang": "/images/icons/Gelang.svg",
    "sirkam": "/images/icons/Sirkam.svg",
    "kolong-hijab": "/images/icons/Kolong Hijab.svg",
   
    // English
    "brooch": "/images/icons/Bross.svg",
    "necklace": "/images/icons/Kalung.svg",
    "safety-pin": "/images/icons/Peniti.svg",
    "bracelet": "/images/icons/Gelang.svg",
    "hair-comb": "/images/icons/Sirkam.svg",
   "scarf-brooch": "/images/icons/Kolong Hijab.svg",
  };

  return iconMap[slug] || "/images/icons/gem.svg";
}