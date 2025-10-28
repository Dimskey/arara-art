"use client";

import Link from "next/link";
import { Circle, Diamond, Sparkles, Hexagon, Clock } from "lucide-react";
import { Category } from "@/types/collection";

interface CategoryItemProps {
  category: Category;
}

const iconMap = {
  circle: Circle,
  diamond: Diamond,
  sparkles: Sparkles,
  hexagon: Hexagon,
  clock: Clock,
};

export default function CategoryItem({ category }: CategoryItemProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] || Circle;

  return (
    <Link href={category.href}>
      <div className="flex flex-col items-center gap-3 lg:gap-5 min-w-[120px] lg:min-w-[150px] cursor-pointer transition-transform duration-300 hover:-translate-y-2 group">
        <div className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-[var(--color-border)] rounded-full flex items-center justify-center transition-colors group-hover:border-[var(--color-accent)]/50">
          <Icon className="w-7 h-7 lg:w-9 lg:h-9 stroke-[var(--color-accent)] stroke-[1.5]" />
        </div>
        <span className="text-xs tracking-[0.2em] font-[family-name:var(--font-montserrat)] text-[var(--color-accent)] text-center">
          {category.label}
        </span>
      </div>
    </Link>
  );
}