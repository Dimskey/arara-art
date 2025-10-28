"use client";

import Link from "next/link";
import Image from "next/image";
import { Collection } from "@/types/collection";
import ImagePlaceholder from "./ImagePlaceholder";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: Collection;
  cardData: {
    title: string;
    description: string;
  };
  featured?: boolean;
}

export default function CollectionCard({
  collection,
  cardData,
  featured = false,
}: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <div
        className={cn(
          "bg-[var(--color-card-bg)] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group",
          featured && "md:row-span-2"
        )}
      >
        {/* Gambar Koleksi */}
        <div
          className={cn(
            "relative w-full aspect-[3/4] object-cover",
            featured && "md:aspect-[3/4]"
          )}
        >
          {collection.image ? (
            <Image
              src={collection.image}
              alt={cardData.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <ImagePlaceholder withHoverEffect />
          )}
        </div>

        {/* Informasi Koleksi */}
        <div className="p-5 text-center">
          <h3 className="text-xl font-medium tracking-[0.15em] mb-2 uppercase text-[var(--color-foreground)]">
            {cardData.title}
          </h3>
          <p className="text-sm text-[var(--color-accent)]/80 leading-relaxed">
            {cardData.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
