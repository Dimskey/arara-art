"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Collection } from "@/types/collection";
import ImagePlaceholder from "./ImagePlaceholder";
import { cn } from "@/lib/utils";
import { debugScroll } from "@/lib/debugScroll";

gsap.registerPlugin(ScrollTrigger);

interface CollectionCardProps {
  collection: Collection;
  cardData: {
    title: string;
    description: string;
  };
  featured?: boolean;
  index: number; 
}

export default function CollectionCard({
  collection,
  cardData,
  featured = false,
  index, 
}: CollectionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // arah animasi masuk
    const dir = index % 2 === 0 ? 80 : -80;

    gsap.fromTo(
      card,
      { opacity: 0, x: dir },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "bottom 65%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, [index]);

  // opsi mouse parallax
  const handleMove = (e: any) => {
    if (!imageRef.current) return;

    const rect = cardRef.current?.getBoundingClientRect();
    const x = (e.clientX - rect!.left) / rect!.width - 0.5;
    const y = (e.clientY - rect!.top) / rect!.height - 0.5;

    gsap.to(imageRef.current, {
      x: x * 15,
      y: y * 15,
      duration: 0.3,
    });
  };

  const handleLeave = () => {
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      duration: 0.3,
    });
  };

  return (
    <Link href={`/collections/${collection.slug}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "bg-[var(--color-card-bg)]  overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group",
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
              ref={imageRef}
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
          <p className="text-sm text-[var(--color-accent)]/80 leading-relaxed ">
            {cardData.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
