"use client";

import { heroBanners } from "@/data/HeroBanner";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

export default function HeroBannerGrid() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6">
      {heroBanners.map((banner, index) => (
        <div    
          key={banner.id}
          className={`rounded-full overflow-hidden aspect-square w-50 h-50 md:w-100 md:h-100 ${
            index === 0 ? "self-end" : index === 1 ? "self-center" : "self-start"
          }`}
        >
          <ImagePlaceholder
            src={banner.image}             // ✅ kirim URL gambar ke ImagePlaceholder
            alt={`Hero banner ${banner.id}`}
            className="w-full h-full"
            withHoverEffect
          />
        </div>
      ))}
    </div>
  );
}
