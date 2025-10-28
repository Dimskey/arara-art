"use client";

import { useState } from "react";
import { categories } from "@/data/categories";
import CategoryItem from "@/components/shared/CategoryItem";
import Pagination from "@/components/ui/Pagination";

export default function CategoriesSection() {
  const [activePage, setActivePage] = useState(0);

  return (
    <section className="py-20 lg:py-28 border-t border-[var(--color-border)]/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-medium tracking-[0.25em]">
            CATEGORIES
          </h2>
        </div>

        {/* Categories Grid - Mobile Responsive */}
        <div className="pb-10">
          {/* Mobile: Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:hidden">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
          
          {/* Desktop: Horizontal Scroll */}
          <div className="hidden lg:block scrollbar-hide">
            <div className="flex gap-12 lg:gap-16 justify-center px-4">
              {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          totalPages={3}
          activePage={activePage}
          onPageChange={setActivePage}
        />
      </div>
    </section>
  );
}