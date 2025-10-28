"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/contexts/langContext";

interface Product {
  title: string;
  slug: string;
  images?: { url: string }[];
  price?: number;
  discountPrice?: number;
  category?: string;
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
  const { lang, t } = useLang();

  // Auto-slide setiap 3 detik
  useEffect(() => {
    if (!images?.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images?.length]);

  const title = product.title;
  const desc = product.description;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link
        href={`/${lang}/product`}
        className="text-sm text-[var(--color-accent)] hover:underline inline-flex items-center gap-2 mb-6"
      >
        ← {lang === "id" ? "Kembali ke semua produk" : "Back to all products"}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* === Gambar Produk === */}
        <div className="relative bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden aspect-square">
          {images?.length > 0 ? (
            <>
              {images.map((img, i) => (
                <Image
                  key={i}
                  src={img.url}
                  alt={`${title} image ${i + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-700 ${
                    i === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Titik navigasi */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentIndex
                        ? "bg-[var(--color-accent)] scale-110"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400">
              No Image
            </div>
          )}
        </div>

        {/* === Info Produk === */}
        <div className="flex flex-col justify-center">
          {product.category && (
            <p className="uppercase tracking-wider text-xs text-[var(--color-accent)] mb-2">
              {product.category}
            </p>
          )}

          <h1 className="text-3xl font-semibold mb-2">{title}</h1>

          {desc && (
            <p className="text-[var(--color-accent)] mb-6 leading-relaxed border-b border-[var(--color-border)] pb-6">
              {desc}
            </p>
          )}

          {/* Harga */}
          <div className="flex items-center gap-3 mb-8">
            <p className="text-[var(--color-accent)] text-2xl font-semibold">
              Rp.
              {product.price != null
                ? product.price.toLocaleString("id-ID", {
                    minimumFractionDigits: product.price % 1 === 0 ? 0 : 2,
                    maximumFractionDigits: 2,
                  })
                : "N/A"}
            </p>
            {product.discountPrice && (
              <p className="text-neutral-400 line-through text-lg">
                Rp.
                {product.discountPrice.toLocaleString("id-ID", {
                  minimumFractionDigits:
                    product.discountPrice % 1 === 0 ? 0 : 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
          </div>

          {/* Tombol Shopee / Tokopedia */}
          <div className="flex flex-col sm:flex-row gap-3">
            {product.shopeeLink && (
              <Link
                href={product.shopeeLink}
                target="_blank"
                className="px-6 py-3 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition-all text-center"
              >
                Shopee
              </Link>
            )}

            {product.tokopediaLink && (
              <Link
                href={product.tokopediaLink}
                target="_blank"
                className="px-6 py-3 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition-all text-center"
              >
                Tokopedia
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
