"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  src?: string;                // 🔹 URL gambar (opsional)
  alt?: string;                // 🔹 Deskripsi alt text
  className?: string;
  withHoverEffect?: boolean;
}

export default function ImagePlaceholder({
  src,
  alt,
  className,
  withHoverEffect = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-500",
        withHoverEffect && "group-hover:scale-105",
        className
      )}
    >
      {/* Jika ada gambar, tampilkan gambar */}
      {src ? (
        <Image
          src={src}
          alt={alt || "Hero banner image"}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        // Jika tidak ada gambar, tampilkan gradient default
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-placeholder-from)] via-[var(--color-placeholder-via)] to-[var(--color-placeholder-to)] transition-all duration-500" />
      )}

      {/* Decorative Circle */}
      <div
      />
    </div>
  );
}
