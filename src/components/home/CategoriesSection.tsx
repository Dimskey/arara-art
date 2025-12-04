"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Sparkles, 
  Circle, 
  Pin, 
  Watch, 
  Scissors, 
  Heart,
  Gem,
  Crown
} from "lucide-react";

// Query untuk fetch unique categories dari products
const categoriesQuery = `*[_type == "product" && defined(category)] {
  category
} | order(category asc)`;

interface CategoryData {
  category: string;
}

export default function CategoriesSection() {
  const params = useParams();
  const lang = (params.lang as string) || "en";
  
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Pagination settings untuk mobile
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data: CategoryData[] = await client.fetch(categoriesQuery);
        
        // Get unique categories
        const uniqueCategories = data.reduce((acc: CategoryData[], curr) => {
          if (!acc.find(item => item.category === curr.category)) {
            acc.push(curr);
          }
          return acc;
        }, []);
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    activePage * itemsPerPage,
    (activePage + 1) * itemsPerPage
  );

  if (loading) {
    return (
      <section className="py-20 lg:py-28 border-t border-[var(--color-border)]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center text">
            <p className="text-lg opacity-60">Loading categories...</p>
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
            {paginatedCategories.map((item) => (
              <CategoryCard
                key={item.category}
                category={item.category}
                lang={lang}
              />
            ))}
          </div>
          
          {/* Desktop: Show All */}
          <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-12">
            {categories.map((item) => (
              <CategoryCard
                key={item.category}
                category={item.category}
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
                onClick={() => setActivePage(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === activePage
                    ? "bg-[var(--color-accent)]"
                    : "bg-[var(--color-border)] hover:bg-[var(--color-accent)]/50"
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Category Card Component
function CategoryCard({
  category,
  lang,
}: {
  category: string;
  lang: string;
}) {
  // Pakai slug asli dari database (sudah Title Case)
  const slug = category.replace(/\s+/g, "-");

  return (
    <Link
      href={`/${lang}/product?category=${slug}`}
      className="group flex flex-col items-center gap-4 transition-all"
    >
      <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-colors bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-[var(--color-accent)] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          {getCategoryIcon(category)}
        </div>
      </div>
      <h3 className="text-sm lg:text-base font-medium tracking-wider text-center">
        {category}
      </h3>
    </Link>
  );
}

// Function untuk mendapatkan icon berdasarkan kategori
function getCategoryIcon(category: string) {
  const cat = category.toLowerCase();
  
  if (cat.includes("bros") || cat.includes("brooch")) {
    return <Heart className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />;
  }
  if (cat.includes("kalung") || cat.includes("necklace")) {
    return <Circle className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />;
  }
  if (cat.includes("peniti") || cat.includes("pin") || cat.includes("safety")) {
    return <Pin className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />;
  }
  if (cat.includes("gelang") || cat.includes("bracelet")) {
    return <Watch className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />;
  }
  if (cat.includes("sirkam") || cat.includes("hairpin")) {
    return <Scissors className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />;
  }
  if (cat.includes("cincin") || cat.includes("ring")) {
    return <Circle className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />;
  }
  if (cat.includes("anting") || cat.includes("earring")) {
    return <Sparkles className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />;
  }
  if (cat.includes("giwang") || cat.includes("mahkota") || cat.includes("crown")) {
    return <Crown className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />;
  }
  
  return <Gem className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />;
}