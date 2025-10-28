"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  activePage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-3 mt-10">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-colors duration-300",
            activePage === i 
              ? "bg-[var(--color-accent)]" 
              : "bg-[var(--color-border)] hover:bg-[var(--color-accent)]/50"
          )}
          aria-label={`Go to page ${i + 1}`}
        />
      ))}
    </div>
  );
}