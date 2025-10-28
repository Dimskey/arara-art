"use client";

import { aboutbanners } from "@/data/AboutBanner";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

export default function AboutBannerGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {aboutbanners.map((banner) => (
        <div
          key={banner.id}
          className="relative bg-[var(--color-border)] aspect-[4/3] flex flex-col justify-end p-6 overflow-hidden group"
        >
          {/* Gambar + overlay */}
          <div className="absolute inset-0">
            <ImagePlaceholder
              src={banner.image}
              alt={`Banner ${banner.id}`}
              className="w-full h-full object-cover"
              withHoverEffect
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>
          </div>

          {/* Konten teks */}
          <div className="relative z-10 mt-auto">
            <h3 className="text-lg font-semibold text-white uppercase drop-shadow-md">
              {banner.title}
            </h3>
            <p className="text-sm text-gray-200 mt-1 drop-shadow-sm">
              {banner.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
