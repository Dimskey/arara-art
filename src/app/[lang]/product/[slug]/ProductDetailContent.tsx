"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/contexts/langContext";
import { ShoppingBag, MessageCircle } from "lucide-react";

interface Product {
  title: string;
  slug: string;
  images?: { url: string }[];
  price?: number;
  discountPrice?: number;
  category?: string;
  specifications?: string[];
  description?: string;
  shopeeLink?: string;
  tokopediaLink?: string;
}

export default function ProductDetailContent({
  product,
  images,
}: {
  product: Product;
  images: { url: string }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isIndoClient, setIsIndoClient] = useState<boolean | null>(null);
  const { lang, t } = useLang();

  // === Detect client location ===
  useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setIsIndoClient(data.country_code === "ID");
      } catch (err) {
        console.error("Country detection failed:", err);
        setIsIndoClient(false);
      }
    }
    detectCountry();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link
        href={`/${lang}/product`}
        className="text-sm text-[var(--color-accent)] hover:underline inline-flex items-center gap-2 mb-6"
      >
        ← {lang === "id" ? "Kembali ke semua produk" : "Back to all products"}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-6">
        {/* === Thumbnail Column === */}
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto max-h-117 pr-1">
          {images?.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`relative w-20 h-20 shrink-0 border transition-all ${
                currentIndex === i
                  ? "border-[var(--color-accent)] scale-[1.03]"
                  : "border-[var(--color-border)]"
              }`}
            >
              <Image
                src={img.url}
                alt={`${product.title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* === Main Image === */}
        <div className="relative bg-white dark:bg-black overflow-hidden aspect-square">
          {images?.[currentIndex] ? (
            <Image
              src={images[currentIndex].url}
              alt={product.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400">
              No Image
            </div>
          )}
        </div>

        {/* === Product Info === */}
        <div className="flex flex-col justify-start">
          {product.category && (
            <p className="uppercase tracking-wider text-xs text-[var(--color-accent)] mb-2">
              {product.category}
            </p>
          )}

          <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>

          {product.description && (
            <p className="text-[var(--color-foreground-muted)] mb-6 leading-relaxed border-b border-[var(--color-border)] pb-6 whitespace-pre-line">
              {product.description}
            </p>
          )}

          {product.specifications && (
            <p className="text-[var(--color-foreground-muted)] mb-6 leading-relaxed border-b border-[var(--color-border)] pb-6 whitespace-pre-line">
              {product.specifications.join("\n")}
            </p>
          )}

          {/* === Price === */}
          <div className="flex items-center gap-3 mb-8">
            <p className="text-[var(--color-accent)] text-2xl font-semibold">
              Rp.
              {product.price?.toLocaleString("id-ID", {
                minimumFractionDigits: 0,
              })}
            </p>

            {product.discountPrice && (
              <p className="text-neutral-400 line-through text-lg">
                Rp.
                {product.discountPrice?.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                })}
              </p>
            )}
          </div>

          {/* === CTA Buttons === */}
          {isIndoClient === null ? (
            <p className="text-sm text-neutral-400">
              {lang === "id" ? "Mendeteksi lokasi..." : "Detecting location..."}
            </p>
          ) : isIndoClient ? (
            <div className="flex flex-col sm:flex-row gap-3">
              {product.shopeeLink && (
                <Link
                  href={product.shopeeLink}
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition-all"
                >
                  <ShoppingBag size={18} />
                  {lang === "id" ? "Shopee" : "Shopee"}
                </Link>
              )}
              {product.tokopediaLink && (
                <Link
                  href={product.tokopediaLink}
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition-all"
                >
                  <ShoppingBag size={18} />
                  {lang === "id" ? "Tokopedia" : "Tokopedia"}
                </Link>
              )}
            </div>
          ) : (
            <Link
              href="https://wa.me/6281234567890" // ganti nomor WA kamu
              target="_blank"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-all"
            >
              <MessageCircle size={18} />
              {lang === "id" ? "Order via WhatsApp" : "Order via WhatsApp"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
